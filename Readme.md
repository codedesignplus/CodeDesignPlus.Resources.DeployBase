# CodeDesignPlus.Resources.DesployBase

This repository contains the resources and deployment files that support the articles of [**Phase 2: Deploying the CodeDesignPlus Ecosystem**](https://www.codedesignplus.com/blog/ecosistema/1-microservices-and-process/). Here you will find the values, commands, and configurations needed to deploy the microservices and resources described in the blog.

## Prerequisites

- **Node.js 24**
- The base infrastructure from **Phase 1** must be ready, following this guide: [Infrastructure Roadmap](https://www.codedesignplus.com/blog/env-dev/2-hoja-ruta/)

## Initial Setup

Before running the deployment script, you must create a `values.json` file in the root of the project, using the structure of `values.example.json` as a reference. This will allow you to avoid interactive prompts. If any value is missing in `values.json`, the script will prompt you for it during execution.

## Repository Structure

Each folder corresponds to a microservice or resource and contains:

- `values-*.yaml` files for Helm values.
- A `commands.md` file with recommended deployment and management commands.

## Automated Deployment

The main file is `main.mjs`, which scans the `index.mjs` files of each microservice. Each one initializes the deployment, runs the Helm charts, configures secrets in Vault, and prints the result of each operation to the console.

### How to Run

To start the deployment, run:

```powershell
npm start
```

If your `values.json` file is complete, the process will be automatic. If any value is missing, you will be prompted for it in the console.

### Example Output

```powershell
PS E:\Repositories\CodeDesignPlus.Resources.DesployBase> npm start

> codedesignplus.resources.desploybase@1.0.0 start
> node ./main.mjs

==============================
🚀 Deploying microservice: ms-users
==============================

🔗 [1] Initializing deployment for ms-users...
Executing command: helm repo add codedesignplus https://www.codedesignplus.com/helm-charts/

📦 Deploying ms-users REST API...
Executing command: helm upgrade --install ms-users-rest codedesignplus/ms-users-rest -f ./ms-users/values-rest.yaml --namespace inventory --create-namespace

Executing command: helm repo update

Release "ms-users-rest" has been upgraded. Happy Helming!
NAME: ms-users-rest
LAST DEPLOYED: Tue Aug 12 12:26:30 2025
NAMESPACE: inventory
STATUS: deployed
REVISION: 2

📦 Deploying ms-users gRPC API...
Executing command: helm upgrade --install ms-users-grpc codedesignplus/ms-users-grpc -f ./ms-users/values-grpc.yaml --namespace inventory --create-namespace

Release "ms-users-grpc" has been upgraded. Happy Helming!
NAME: ms-users-grpc
LAST DEPLOYED: Tue Aug 12 12:26:31 2025
NAMESPACE: inventory
STATUS: deployed
REVISION: 2

📦 Deploying ms-users Worker...
Executing command: helm upgrade --install ms-users-worker codedesignplus/ms-users-worker -f ./ms-users/values-worker.yaml --namespace inventory --create-namespace

Release "ms-users-worker" has been upgraded. Happy Helming!
NAME: ms-users-worker
LAST DEPLOYED: Tue Aug 12 12:26:32 2025
NAMESPACE: inventory
STATUS: deployed
REVISION: 2

🔐 Configuring Vault for ms-users...
Executing command: vault kv put -mount=inventory-keyvalue ms-users "RabbitMQ:UserName=default_user__**********" "RabbitMQ:Password=**************" "Redis:Instances:Core:ConnectionString=redis-standa**********************ster.local:6379" "Mongo:ConnectionString=mongodb+srv://**********************z5fcf7.mongodb.net/?retryWrites=true&w=majority"

========== Secret Path ==========
inventory-keyvalue/data/ms-users

======= Metadata =======
Key                Value
---                -----
created_time       2025-08-12T17:26:34.882938817Z
custom_metadata    <nil>
deletion_time      n/a
destroyed          false
version            2

... (similar output for each microservice) ...
```

---

## Additional Resources

- [Helm - Official Documentation](https://helm.sh/docs/)
- [Vault - Official Documentation](https://developer.hashicorp.com/vault/docs)

---

This repository is part of the CodeDesignPlus learning ecosystem. If you have questions or suggestions, you can leave your comments in the blog articles.
