import fs from 'fs';
import yaml from 'js-yaml'
import Util from './util.mjs';

export default class DeployBase {

    constructor(settings) {
        this.settings = settings;
    }

    async setSettings() {
        const files = fs.globSync("**.yaml");

        for (const file of files) {
            const data = await Util.updateSettingsYaml(file, this.settings);

            await fs.promises.writeFile(file, yaml.dump(data, { lineWidth: -1, noArrayIndent: true }), 'utf8');
        }
    }
}