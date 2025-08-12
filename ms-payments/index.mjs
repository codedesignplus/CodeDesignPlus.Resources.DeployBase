import promptSync from 'prompt-sync';
import DeployBase  from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-payments';

    constructor(settings, values) {
        super(settings, values);
    }

    async init() {
        this.initHelm(this._name);

        this.settings['payment'] = {
            "Payu:AccountId": this.values.payment['Payu:AccountId'] || prompt("Enter PayU Account ID: "),
            "Payu:ApiKey": this.values.payment['Payu:ApiKey'] || prompt("Enter PayU API Key: "),
            "Payu:ApiLogin": this.values.payment['Payu:ApiLogin'] || prompt("Enter PayU API Login: "),
            "Payu:MerchantId": this.values.payment['Payu:MerchantId'] || prompt("Enter PayU Merchant ID: "),
            "Payu:SecretKey": this.values.payment['Payu:SecretKey'] || prompt("Enter PayU Secret Key: ")
        }
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

        const secrets = this.settings.payment;

        await this.createVaultSecrets(this._name, secrets);
    }

    async end() {
        console.log(`✅ Deployment finished for ${this._name}!\n`);
    }
}