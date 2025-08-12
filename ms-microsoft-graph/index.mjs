import promptSync from 'prompt-sync';
import DeployBase  from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-microsoft-graph';

    constructor(settings) {
        super(settings);
    }

    async init() {
        this.settings['microsoftGraph'] = {
            vault: {
                transitPassword: prompt("Enter Vault Transit Password:")
            }
        }
    }

    async deploy() {
        console.log(`Deploying ${this._name}...`);
    }
}