
# Helm Install

* **Deploy the REST API**
    ```powershell
    helm upgrade --install ms-locations-rest codedesignplus/ms-locations-rest -f ./values-rest.yaml --namespace inventory --create-namespace
    ```

# Vault

* **Login to Vault**
    ```powershell
    $env:VAULT_ADDR = "https://vault.codedesignplus.app"
    vault login token=<Token>
    ```

* **Store Secrets in Vault**

    ```powershell
    vault kv put -mount=inventory-keyvalue ms-locations `
        "RabbitMQ:UserName=<RabbitMQUser>" `
        "RabbitMQ:Password=<RabbitMQPassword>" `
        "Redis:Instances:Core:ConnectionString=<RedisConnectionString>" `
        "Mongo:ConnectionString=<MongoConnectionString>"
    ```