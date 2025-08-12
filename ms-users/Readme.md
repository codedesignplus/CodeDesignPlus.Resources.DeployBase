
# Helm Install

* **Deploy the REST API**
    ```powershell
    helm upgrade --install ms-users-rest codedesignplus/ms-users-rest -f ./values-rest.yaml --namespace inventory --create-namespace
    ```

* **Deploy the gRPC API**
    ```powershell
    helm upgrade --install ms-users-grpc codedesignplus/ms-users-grpc -f ./values-grpc.yaml --namespace inventory --create-namespace
    ```

* **Deploy the Worker API**
    ```powershell
    helm upgrade --install ms-users-worker codedesignplus/ms-users-worker -f ./values-worker.yaml --namespace inventory --create-namespace
    ```

# Vault

* **Login to Vault**
    ```powershell
    $env:VAULT_ADDR = "https://vault.codedesignplus.app"
    vault login token=<Token>
    ```

* **Store Secrets in Vault**
    ```powershell
    vault kv put -mount=inventory-keyvalue ms-users `
        "RabbitMQ:UserName=<RabbitMQUser>" `
        "RabbitMQ:Password=<RabbitMQPassword>" `
        "Redis:Instances:Core:ConnectionString=<RedisConnectionString>" `
        "Mongo:ConnectionString=<MongoConnectionString>"
    ```