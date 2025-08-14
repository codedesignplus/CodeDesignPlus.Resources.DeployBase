import promptSync from 'prompt-sync';
import DeployBase  from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-services';

    constructor(settings, values) {
        super(settings, values);
    }

    async init() {
        this.initHelm(this._name);
    }

    async deploy() {
        await this.deployRest();
        await this.deployGrpc();
        await this.configVault();
    }

    async deployRest() {
        console.log(`📦 Deploying ${this._name} REST API...`);

        const release = `${this._name}-rest`;
        const chart = `${this._name}-rest`;
        const pathValues = `./${this._name}/values-rest.yaml`;

        await this.deployHelm(release, chart, pathValues);
    }

    async deployGrpc() {
        console.log(`📦 Deploying ${this._name} gRPC API...`);

        const release = `${this._name}-grpc`;
        const chart = `${this._name}-grpc`;
        const pathValues = `./${this._name}/values-grpc.yaml`;

        await this.deployHelm(release, chart, pathValues);
    }

    async configVault() {
        console.log(`🔐 Configuring Vault for ${this._name}...`);

        const secrets = {};

        await this.createVaultSecrets(this._name, secrets);
    }

    async end() {
        console.log(`✅ Deployment finished for ${this._name}!\n`);
    }
}