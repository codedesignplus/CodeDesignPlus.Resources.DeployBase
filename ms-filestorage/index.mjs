import promptSync from 'prompt-sync';
import DeployBase  from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-filestorage';

    constructor(settings) {
        super(settings);
    }

    async init() {
        this.settings['fileStorage'] = {
            azureBlob: {
                accountName: prompt("Enter File Storage Azure Blob Account Name:"),
                accountKey: prompt("Enter File Storage Azure Blob Account Key:")
            }
        }
    }

    async deploy() {
        console.log(`Deploying ${this._name}...`);
    }
}