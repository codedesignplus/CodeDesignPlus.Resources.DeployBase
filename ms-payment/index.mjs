import promptSync from 'prompt-sync';
import DeployBase  from '../deploy-base.mjs';

const prompt = promptSync();

export class Deploy extends DeployBase {
    _name = 'ms-payment';

    constructor(settings) {
        super(settings);
    }

    async init() {
        this.settings['payu'] = {
            accountId: prompt("Enter PayU Account ID:"),
            merchantId: prompt("Enter PayU Merchant ID:"),
            apiKey: prompt("Enter PayU API Key:"),
            apiLogin: prompt("Enter PayU API Login:"),
            secretKey: prompt("Enter PayU Secret Key:")
        }
    }

    async deploy() {
        console.log(`Deploying ${this._name}...`);
    }
}