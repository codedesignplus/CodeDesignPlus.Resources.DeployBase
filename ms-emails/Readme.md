
# Helm Install

* **Deploy the REST API**
    ```powershell
    helm upgrade --install ms-emails-rest codedesignplus/ms-emails-rest -f ./values-rest.yaml --namespace inventory --create-namespace
    ```

* **Deploy the gRPC API**
    ```powershell
    helm upgrade --install ms-emails-grpc codedesignplus/ms-emails-grpc -f ./values-grpc.yaml --namespace inventory --create-namespace
    ```

* **Deploy the Worker API**
    ```powershell
    helm upgrade --install ms-emails-worker codedesignplus/ms-emails-worker -f ./values-worker.yaml --namespace inventory --create-namespace
    ```

# Vault

* **Login to Vault**
    ```powershell
    $env:VAULT_ADDR = "https://vault.codedesignplus.app"
    vault login token=<Token>
    ```

* **Store Secrets in Vault**
    ```powershell
    vault kv put -mount=inventory-keyvalue ms-emails `
        "RabbitMQ:UserName=<RabbitMQUser>" `
        "RabbitMQ:Password=<RabbitMQPassword>" `
        "Redis:Instances:Core:ConnectionString=<RedisConnectionString>" `
        "Mongo:ConnectionString=<MongoConnectionString>" `
        "Email:TenantId=<EmailTenantId>" `
        "Email:ClientId=<EmailClientId>" `
        "Email:ClientSecret=<EmailClientSecret>" `
        "Email:UserIdWithLicense=<EmailUserIdWithLicense>" `
        "Vault:Transit:SecretContexts:vault_transit_password_temp=<SecretTransitPasswordTemp>"
    ```