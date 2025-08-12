import fs from 'fs';
import yaml from 'js-yaml'
import Util from './util.mjs';
import { exec } from 'child_process';


export default class DeployBase {

    constructor(settings, values) {
        this.settings = settings;
        this.values = values;
    }
    
    
    async initHelm(name) {
        console.log('\n==============================');
        console.log(`🚀 Deploying microservice: ${name}`);
        console.log('==============================\n');

        console.log(`🔗 [1] Initializing deployment for ${name}...`);
        await this.runCommand('helm repo add codedesignplus https://www.codedesignplus.com/helm-charts/', {});
        await this.runCommand('helm repo update', {});
    }


    async setSettings() {
        const files = fs.globSync("**.yaml");

        for (const file of files) {
            const data = await Util.updateSettingsYaml(file, this.settings);

            await fs.promises.writeFile(file, yaml.dump(data, { lineWidth: -1, noArrayIndent: true }), 'utf8');
        }
    }

    async runCommand(command, env) {

        console.log(`Executing command: ${command}\n`);

        return new Promise((resolve, reject) => {
            exec(command, {
                env: {
                    ...env
                }
            }, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    async deployHelm(release, chart, pathValues) {
        const env = {};

        try {
            const command = `helm upgrade --install ${release} codedesignplus/${chart} -f ${pathValues} --namespace ${this.settings.namespace} --create-namespace`;
            const result = await this.runCommand(command, env);
            console.log(result);
        } catch (error) {
            console.error(`Deployment failed: ${error}`);
        }
    }

    async createVaultSecrets(microservice, secrets) {
        const env = {
            VAULT_ADDR: this.settings.vault.server,
            VAULT_TOKEN: this.settings.vault.token
        };

        const data = {
            "RabbitMQ:UserName": this.settings.rabbitMQ.user,
            "RabbitMQ:Password": this.settings.rabbitMQ.password,
            "Redis:Instances:Core:ConnectionString": this.settings.redis,
            "Mongo:ConnectionString": this.settings.mongo,
            ...secrets
        };

        try {
            const command = `vault kv put -mount=${this.settings.vault.solution}-keyvalue ${microservice} ${Object.entries(data).map(([key, value]) => `"${key}=${value}"`).join(" ")}`;

            const result = await this.runCommand(command, env);
            console.log(result);
        } catch (error) {
            console.error(`Failed to create Vault secrets: ${error}`);
        }
    }
}