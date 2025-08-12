import fs from 'fs';
import yaml from 'js-yaml'
import promptSync from 'prompt-sync';
import DeployBase from '../deploy-base.mjs';

const prompt = promptSync();




export class Deploy extends DeployBase {
    _name = 'ms-emails';

    constructor(settings) {
        super(settings);
    }

    async init() {
        this.settings['email'] = {
            tenantId: prompt("Enter Email Tenant ID:"),
            clientId: prompt("Enter Email Client ID:"),
            clientSecret: prompt("Enter Email Client Secret:"),
            userIdWithLicense: prompt("Enter Email User ID with License:")
        }
    }

    async deploy() {
        console.log(`Deploying ${this._name}...`);
    }
}