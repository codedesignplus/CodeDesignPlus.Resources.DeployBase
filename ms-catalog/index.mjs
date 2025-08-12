import fs from 'fs';
import yaml from 'js-yaml'
import promptSync from 'prompt-sync';
import Util from '../util.mjs';
import DeployBase  from '../deploy-base.mjs';


export class Deploy extends DeployBase {
    _name = 'ms-catalogs';

    constructor(settings) {
        super(settings);
    }

    async init() {
        console.log(`1. Initializing deployment for ${this._name}...`);
    }

    async deploy() {
        console.log(`2. Deploying ${this._name}...`);
    }
}