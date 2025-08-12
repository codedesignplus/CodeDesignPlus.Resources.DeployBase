
# CodeDesignPlus.Resources.DesployBase

This repository contains the resources and deployment files that support the articles of **Phase 2: Deploying the CodeDesignPlus Ecosystem**. Here you will find the values, commands, and configurations needed to deploy the microservices and resources described in the blog.

## Purpose

The goal of this project is to centralize the configuration and deployment files (mainly for Helm and Vault) that accompany the Phase 2 articles of the CodeDesignPlus blog, making it easier to reproduce and automate the microservices ecosystem.

## Related Articles

1. [Microservices and deployment process](https://www.codedesignplus.com/blog/ecosistema/1-microservices-and-process/)
2. [Collecting global secrets](https://www.codedesignplus.com/blog/ecosistema/2-recolectando-secretos-globales/)
3. [ms-services](https://www.codedesignplus.com/blog/ecosistema/3-ms-services/)
4. [ms-catalog](https://www.codedesignplus.com/blog/ecosistema/4-ms-catalog/)
5. [ms-emails](https://www.codedesignplus.com/blog/ecosistema/5-ms-emails/)
6. [ms-modules](https://www.codedesignplus.com/blog/ecosistema/6-ms-modules/)
7. [ms-roles](https://www.codedesignplus.com/blog/ecosistema/7-ms-roles/)
8. [ms-rbac](https://www.codedesignplus.com/blog/ecosistema/8-ms-rbac/)
9. [ms-locations](https://www.codedesignplus.com/blog/ecosistema/9-ms-locations/)
10. [ms-filestorage](https://www.codedesignplus.com/blog/ecosistema/10-ms-filestorage/)
11. [ms-tenant](https://www.codedesignplus.com/blog/ecosistema/11-ms-tenant/)
12. [ms-payments](https://www.codedesignplus.com/blog/ecosistema/12-ms-payments/)
13. [ms-users](https://www.codedesignplus.com/blog/ecosistema/13-ms-users/)
14. [ms-licenses](https://www.codedesignplus.com/blog/ecosistema/14-ms-licenses/)
15. [ms-microsoftgraph](https://www.codedesignplus.com/blog/ecosistema/15-ms-microsoftgraph/)

> **Note:** To manage secrets and credentials, you must have [Vault](https://www.codedesignplus.com/blog/env-dev/11-install-vault/#parte-1-desplegando-vault-con-helm) deployed.

## Repository Structure

Each folder corresponds to a microservice or resource and contains:

- `values-*.yaml` files for Helm values.
- A `commands.md` file with recommended deployment and management commands.


## Deployment Script `deploy.mjs`

The `deploy.mjs` script updates the YAML files of the microservices by prompting for the required values in the console. 

### Required Parameters

| Parameter Name                      | Description                                                      | Example Value                                                           |
|-------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------|
| Kubernetes Namespace                | Kubernetes namespace where resources will be deployed             | inventory                                                               |
| HashiCorp Vault URI                 | Public URL of the Vault server                                    | https://vault.codedesignplus.app                                        |
| Virtual Service Internal Host       | Internal Vault service URL in the cluster                         | http://vault.vault.svc.cluster.local:8200                               |
| HashiCorp Vault Token               | Authentication token for Vault                                    | xxxxxxxxxxxxxx                                                          |
| Solution Name                       | Solution or context name                                          | inventory                                                               |
| Security Valid Issuer               | Valid issuer for authentication                                   | https://devcodedesignplus.ciamlogin.com/dfee7752-2c8a-4171-ad95-62ddc82d6ed8/v2.0/ |
| Security Client ID                  | Client ID for authentication                                      | 305f759d-d1d2-467b-9eab-4a61389c7329                                    |
| Security Valid Audience             | Valid audience for authentication                                 | 305f759d-d1d2-467b-9eab-4a61389c7329                                    |
| OpenTelemetry Server Address        | OpenTelemetry collector address                                   | http://inventory-opentelemetry-collector.otel-collector.svc.cluster.local:4317 |
| RabbitMQ Host                       | RabbitMQ host in the cluster                                      | rabbitmq-cluster.srv-rabbitmq.svc                                       |
| RabbitMQ Username                   | RabbitMQ user                                                    | default_user__xxxxxxxxxxx                                               |
| RabbitMQ Password                   | RabbitMQ password                                                | lweuHLfTWQxxxxxxxxxxxxxxx                                               |
| MongoDB Connection String           | MongoDB connection string                                        | mongodb+srv://xxxxxxxxxxx@inventory.sz5fcf7.mongodb.net/?retryWrites=true&w=majority |
| Redis Connection String             | Redis connection string                                          | <RedisConnectionString>              |
| Virtual Service Host                | Public host of the Virtual Service                                | services.codedesignplus.app                                             |
| Virtual Service Gateway             | Istio gateway for the Virtual Service                             | istio-ingress/istio-inventory-gateway                                   |

When you run the script, you will be prompted for each of these values in the console.


1. **Clone this repository** to your local environment.
2. **Read the corresponding article** in the blog to understand the context and deployment steps.
3. **Use the files and commands** for each microservice as instructed in the article.
4. **Make sure Vault is deployed** and configured for global secrets management.

## Additional Resources

- [Helm Official Documentation](https://helm.sh/docs/)
- [Vault Official Documentation](https://developer.hashicorp.com/vault/docs)

---

This repository is part of the CodeDesignPlus learning ecosystem. If you have questions or suggestions, you can leave your comments in the blog articles.
