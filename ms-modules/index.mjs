import promptSync from 'prompt-sync';
import DeployBase  from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-modules';

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