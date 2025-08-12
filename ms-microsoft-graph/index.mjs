import promptSync from 'prompt-sync';
import { DeployBase } from '../deploy-base.mjs';

const prompt = promptSync();

const settingsMicrosoftGraph = {
    vault: {
        transitPassword: prompt("Enter Vault Transit Password:")
    }
}

export class Deploy extends DeployBase {
    _name = 'ms-microsoft-graph';

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