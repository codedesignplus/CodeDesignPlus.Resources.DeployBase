import promptSync from 'prompt-sync';
import DeployBase from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-microsoftgraph';

    constructor(settings, values) {
        super(settings, values);
    }

    async init() {
        this.initHelm(this._name);

        this.settings['microsoftGraph'] = {
            'Vault:Transit:SecretContexts:vault_transit_password_temp': this.values.microsoftGraph['Vault:Transit:SecretContexts:vault_transit_password_temp'] || prompt("Enter Vault Transit Password: "),
            'Graph:ClientId': this.values.microsoftGraph['Graph:ClientId'] || prompt("Enter Graph Client ID: "),
            'Graph:ClientSecret': this.values.microsoftGraph['Graph:ClientSecret'] || prompt("Enter Graph Client Secret: "),
            'Graph:IssuerIdentity': this.values.microsoftGraph['Graph:IssuerIdentity'] || prompt("Enter Graph Issuer Identity: "),
            'Graph:TenantId': this.values.microsoftGraph['Graph:TenantId'] || prompt("Enter Graph Tenant ID: ")
        }
    }

    async deploy() {
        await this.deployRest();
        await this.deployWorker();
        await this.configVault();
    }

    async deployRest() {
        console.log(`📦 Deploying ${this._name} REST API...`);

        const release = `${this._name}-rest`;
        const chart = `${this._name}-rest`;
        const pathValues = `./${this._name}/values-rest.yaml`;

        await this.deployHelm(release, chart, pathValues);
    }

    async deployWorker() {
        console.log(`📦 Deploying ${this._name} Worker...`);

        const release = `${this._name}-worker`;
        const chart = `${this._name}-worker`;
        const pathValues = `./${this._name}/values-worker.yaml`;

        await this.deployHelm(release, chart, pathValues);
    }

    async configVault() {
        console.log(`🔐 Configuring Vault for ${this._name}...`);

        const secrets = this.settings.microsoftGraph;

        await this.createVaultSecrets(this._name, secrets);
    }

    async end() {
        console.log(`✅ Deployment finished for ${this._name}!\n`);
    }
}