import fs from 'fs';
import yaml from 'js-yaml'
import promptSync from 'prompt-sync';
import Util from '../util.mjs';
import { DeployBase } from '../deploy-base.mjs';


export class Deploy extends DeployBase {
    _name = 'ms-licenses';

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