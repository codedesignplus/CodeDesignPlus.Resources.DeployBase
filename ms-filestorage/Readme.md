
# Helm Install

* **Deploy the REST API**
    ```powershell
    helm upgrade --install ms-filestorage-rest codedesignplus/ms-filestorage-rest -f ./values-rest.yaml --namespace inventory --create-namespace
    ```
    
# Vault

* **Login to Vault**
    ```powershell
    $env:VAULT_ADDR = "https://vault.codedesignplus.app"
    vault login token=<Token>
    ```

* **Store Secrets in Vault**
    ```powershell
    vault kv put -mount=inventory-keyvalue ms-filestorage `
        "RabbitMQ:UserName=<RabbitMQUser>" `
        "RabbitMQ:Password=<RabbitMQPassword>" `
        "Redis:Instances:Core:ConnectionString=<RedisConnectionString>" `
        "Mongo:ConnectionString=<MongoConnectionString>" `
        "FileStorage:AzureBlob:AccountName=<FileStorageAzureBlobAccountName>" `
        "FileStorage:AzureBlob:AccountKey=<FileStorageAzureBlobAccountKey>"
    ```