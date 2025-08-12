
# Helm Install

* **Deploy the REST API**
    ```powershell
    helm upgrade --install ms-payments-rest codedesignplus/ms-payments-rest -f ./values-rest.yaml --namespace inventory --create-namespace
    ```

* **Deploy the gRPC API**
    ```powershell
    helm upgrade --install ms-payments-grpc codedesignplus/ms-payments-grpc -f ./values-grpc.yaml --namespace inventory --create-namespace
    ```

# Vault

* **Login to Vault**
    ```powershell
    $env:VAULT_ADDR = "https://vault.codedesignplus.app"
    vault login token=<Token>
    ```

* **Store Secrets in Vault**

    ```powershell
    vault kv put -mount=inventory-keyvalue ms-payments `
        "RabbitMQ:UserName=<RabbitMQUser>" `
        "RabbitMQ:Password=<RabbitMQPassword>" `
        "Redis:Instances:Core:ConnectionString=<RedisConnectionString>" `
        "Mongo:ConnectionString=<MongoConnectionString>" `
        "Payu:AccountId=<PayuAccountId>" `
        "Payu:MerchantId=<PayuMerchantId>" `
        "Payu:ApiKey=<PayuApiKey>" `
        "Payu:ApiLogin=<PayuApiLogin>" `
        "Payu:SecretKey=<PayuSecretKey>"
    ```