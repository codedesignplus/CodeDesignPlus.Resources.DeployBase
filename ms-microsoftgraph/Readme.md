
# Helm Install

* **Deploy the REST API**
    ```powershell
    helm upgrade --install ms-microsoftgraph-rest codedesignplus/ms-microsoftgraph-rest -f ./values-rest.yaml --namespace inventory --create-namespace
    ```powershell

* **Deploy the gRPC API**
    ```powershell
    helm upgrade --install ms-microsoftgraph-worker codedesignplus/ms-microsoftgraph-worker -f ./values-worker.yaml --namespace inventory --create-namespace
    ```

# Vault

* **Login to Vault**
    ```powershell
    $env:VAULT_ADDR = "https://vault.codedesignplus.app"
    vault login token=<Token>
    ```

* **Store Secrets in Vault**
    ```powershell
    vault kv put -mount=inventory-keyvalue ms-microsoftgraph `
        "RabbitMQ:UserName=<RabbitMQUser>" `
        "RabbitMQ:Password=<RabbitMQPassword>" `
        "Redis:Instances:Core:ConnectionString=<RedisConnectionString>" `
        "Mongo:ConnectionString=<MongoConnectionString>" `
        "Graph:ClientSecret=<GraphClientSecret>" `
        "Vault:Transit:SecretContexts:vault_transit_password_temp=<SecretTransitPasswordTemp>"
    ```