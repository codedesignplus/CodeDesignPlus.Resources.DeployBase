import promptSync from 'prompt-sync';
import { DeployBase } from '../deploy-base.mjs';

const prompt = promptSync();

const settings = {
    payu: {
        accountId: prompt("Enter PayU Account ID:"),
        merchantId: prompt("Enter PayU Merchant ID:"),
        apiKey: prompt("Enter PayU API Key:"),
        apiLogin: prompt("Enter PayU API Login:"),
        secretKey: prompt("Enter PayU Secret Key:")
    }
}

export class Deploy extends DeployBase {
    _name = 'ms-payment';

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