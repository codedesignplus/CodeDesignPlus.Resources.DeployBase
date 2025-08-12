import fs from 'fs';
import promptSync from 'prompt-sync';

const prompt = promptSync();

const values = JSON.parse(fs.readFileSync('./values.json', 'utf8'));

const settings = {
    namespace: values.namespace || prompt("Enter the Kubernetes Namespace: "),
    vault: {
        server: values.vault.server || prompt("Enter the HashiCorp Vault URI: "),
        internalHost: values.vault.internalHost || prompt("Enter the Virtual Service Internal Host: "),
        token: values.vault.token || prompt("Enter the HashiCorp Vault Token: "),
        solution: values.vault.solution || prompt("Enter the solution name: ")
    },
    env: {
        security: {
            validIssuer: values.env.security.validIssuer || prompt("Enter the Security Valid Issuer: "),
            clientId: values.env.security.clientId || prompt("Enter the Security Client ID: ") || '305f759d-d1d2-467b-9eab-4a61389c7329',
            clientSecret: values.env.security.clientSecret || prompt("Enter the Security Client Secret: "),
            validAudience: values.env.security.validAudience || prompt("Enter the Security Valid Audience: ")
        },
        otelServer: values.env.otelServer || prompt("Enter the OpenTelemetry Server Address: "),
    },
    rabbitMQ: {
        host: values.rabbitMQ.host || prompt("Enter the RabbitMQ Host: "),
        user: values.rabbitMQ.user || prompt("Enter the RabbitMQ Username: "),
        password: values.rabbitMQ.password || prompt("Enter the RabbitMQ Password: ")
    },
    mongo: values.mongo || prompt("Enter the MongoDB Connection String: "),
    redis: values.redis || prompt("Enter the Redis Connection String: "),
    virtualService: {
        host: values.virtualService.host || prompt("Enter the Virtual Service Host: "),
        gateway: values.virtualService.gateway || prompt("Enter the Virtual Service Gateway: "),
    }
}

const scripts = fs.globSync("ms-emails/index.mjs");

for (const file of scripts) {
    const modulePath = './' + file.replace(/\\/g, '/');
    const { Deploy } = await import(modulePath);

    const deployInstance = new Deploy(settings, values);
    await deployInstance.init();
    await deployInstance.setSettings();
    await deployInstance.deploy();
}