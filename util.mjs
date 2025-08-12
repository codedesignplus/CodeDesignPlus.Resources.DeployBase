export default class Util {
    static updateEnvironment(data, key, value) {
        if (!data.env) {
            data.env = {};
        }
        data.env[key] = value;
    }

    static setConfigVault(data, internalHost, token, solution) {
        if (!data.vault) {
            data.vault = {};
        }
        data.vault.internalHost = internalHost;
        data.vault.token = token;
        data.vault.solution = solution;
    }

    static setVirtualService(data, host, gateway, namespace) {
        if (!data.virtualService) {
            data.virtualService = {};
        }
        data.virtualService.host = host;
        data.virtualService.gateway = gateway;
        data.virtualService.namespace = namespace;
    }

    static async updateSettingsYaml(file, settings) {

        const content = await fs.promises.readFile(file, 'utf8');
        const data = yaml.load(content);

        Util.updateEnvironment(data, 'RESOURCES__SERVER', `http://ms-services-grpc.${settings.namespace}.svc.cluster.local:5001`);
        Util.updateEnvironment(data, 'SECURITY__VALIDISSUER', settings.env.security.validIssuer);
        Util.updateEnvironment(data, 'SECURITY__CLIENTID', settings.env.security.clientId);
        Util.updateEnvironment(data, 'SECURITY__VALIDAUDIENCES__0', settings.env.security.validAudience);
        Util.updateEnvironment(data, 'RABBITMQ__HOST', settings.rabbitMQ.host);
        Util.updateEnvironment(data, 'LOGGER__OTELENDPOINT', settings.env.otelServer);
        Util.updateEnvironment(data, 'OBSERVABILITY__SERVEROTEL', settings.env.otelServer);

        Util.setConfigVault(data, settings.vault.internalHost, settings.vault.token, settings.vault.solution);

        Util.setVirtualService(data, settings.virtualService.host, settings.virtualService.gateway, settings.namespace);

        return data;
    }
}