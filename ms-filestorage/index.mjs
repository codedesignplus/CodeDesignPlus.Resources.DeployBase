import promptSync from 'prompt-sync';
import { DeployBase } from '../deploy-base.mjs';

const prompt = promptSync();

const settingsFileStorage = {
    azureBlob: {
        accountName: prompt("Enter File Storage Azure Blob Account Name:"),
        accountKey: prompt("Enter File Storage Azure Blob Account Key:")
    }
}

export class Deploy extends DeployBase {
    _name = 'ms-filestorage';

    constructor(settings) {
        super(settings);
    }

    async init() {
        console.log(`Initializing deployment for ${this._name}...`);
    }

    async deploy() {
        console.log(`Deploying ${this._name}...`);
    }
}