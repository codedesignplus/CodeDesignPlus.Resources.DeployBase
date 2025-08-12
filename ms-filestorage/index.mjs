import promptSync from 'prompt-sync';
import DeployBase from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-filestorage';

    constructor(settings, values) {
        super(settings, values);
    }

    async init() {
        this.initHelm(this._name);

        this.settings['fileStorage'] = {
            'FileStorage:AzureBlob:AccountName': this.values.fileStorage['FileStorage:AzureBlob:AccountName'] || prompt("Enter File Storage Azure Blob Account Name: "),
            'FileStorage:AzureBlob:AccountKey': this.values.fileStorage['FileStorage:AzureBlob:AccountKey'] || prompt("Enter File Storage Azure Blob Account Key: ")
        }
    }

    async deploy() {
        await this.deployRest();
        await this.configVault();
    }

    async deployRest() {
        console.log(`📦 Deploying ${this._name} REST API...`);

        const release = `${this._name}-rest`;
        const chart = `${this._name}-rest`;
        const pathValues = `./${this._name}/values-rest.yaml`;

        await this.deployHelm(release, chart, pathValues);
    }

    async configVault() {
        console.log(`🔐 Configuring Vault for ${this._name}...`);

        const secrets = this.settings.fileStorage;

        await this.createVaultSecrets(this._name, secrets);
    }

    async end() {
        console.log(`✅ Deployment finished for ${this._name}!\n`);
    }
}