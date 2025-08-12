import fs from 'fs';
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

const scripts = fs.globSync("**/index.mjs");

for (const file of scripts) {
    const modulePath = './' + file.replace(/\\/g, '/');
    const { Deploy } = await import(modulePath);

    const deployInstance = new Deploy(settings);
    await deployInstance.init();
    await deployInstance.setSettings();
    await deployInstance.deploy();
}