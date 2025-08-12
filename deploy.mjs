import fs from 'fs';
import yaml from 'js-yaml'
import promptSync from 'prompt-sync';

const prompt = promptSync();


const settings = {
    namespace: prompt("Enter the Kubernetes Namespace: "),
    vault: {
        server: prompt("Enter the HashiCorp Vault URI: "),
        internalHost: prompt("Enter the Virtual Service Internal Host: "),
        token: prompt("Enter the HashiCorp Vault Token: "),
        solution: prompt("Enter the solution name: ")
    },
    env: {
        security: {
            validIssuer: prompt("Enter the Security Valid Issuer: "),
            clientId: prompt("Enter the Security Client ID: "),
            validAudience: prompt("Enter the Security Valid Audience: ")
        },
        otelServer: prompt("Enter the OpenTelemetry Server Address: "),
    },
    rabbitMQ: {
        host: prompt("Enter the RabbitMQ Host: "),
        user: prompt("Enter the RabbitMQ Username: "),
        password: prompt("Enter the RabbitMQ Password: ")
    },
    mongo: prompt("Enter the MongoDB Connection String: "),
    redis: prompt("Enter the Redis Connection String: "),
    virtualService: {
        host: prompt("Enter the Virtual Service Host: "),
        gateway: prompt("Enter the Virtual Service Gateway: "),
    }
}

const updateEnvironment = (data, key, value) => {
    const envVar = data['ms-base'].env.find(x => x.name === key);

    if (envVar) {
        envVar.value = value;
    }
}

const setConfigVault = (data, server, token, solution) => {
    data['ms-base'].vault.server = server;
    data['ms-base'].vault.token = token;
    data['ms-base'].vault.solution = solution;
}

const setVirtualService = (data, host, gateway, namespace) => {

    if (!data['ms-base'].virtualService)
        return;

    data['ms-base'].virtualService.hosts = [host];
    data['ms-base'].virtualService.gateways = [gateway];

    const svc = data['ms-base'].virtualService.http[0].route[0].destination.host;

    const currentNamespace = svc.split('.')[1];

    const newSvc = svc.replace(currentNamespace, namespace);

    data['ms-base'].virtualService.http[0].route[0].destination.host = newSvc;
}

const files = fs.globSync("**/**.yaml");

for (const file of files) {

    console.log(`Processing file: ${file}`);

    const content = await fs.promises.readFile(file, 'utf8');
    const data = yaml.load(content);

    updateEnvironment(data, 'RESOURCES__SERVER', `http://ms-services-grpc.${settings.namespace}.svc.cluster.local:5001`);
    updateEnvironment(data, 'SECURITY__VALIDISSUER', settings.env.security.validIssuer);
    updateEnvironment(data, 'SECURITY__CLIENTID', settings.env.security.clientId);
    updateEnvironment(data, 'SECURITY__VALIDAUDIENCES__0', settings.env.security.validAudience);
    updateEnvironment(data, 'RABBITMQ__HOST', settings.rabbitMQ.host);
    updateEnvironment(data, 'LOGGER__OTELENDPOINT', settings.env.otelServer);
    updateEnvironment(data, 'OBSERVABILITY__SERVEROTEL', settings.env.otelServer);

    setConfigVault(data, settings.vault.internalHost, settings.vault.token, settings.vault.solution);

    setVirtualService(data, settings.virtualService.host, settings.virtualService.gateway, settings.namespace);

    await fs.promises.writeFile(file, yaml.dump(data, { lineWidth: -1, noArrayIndent: true }), 'utf8');
}