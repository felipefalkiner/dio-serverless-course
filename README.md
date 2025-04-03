Esse repositório é para guardar os códigos de Lambda que foram usados durante o curso "Criando uma Aplicação Serverless na AWS" da Dio.Me.

[Certificado](https://www.dio.me/certificate/HZ1PZHMC/share)

O [repositório original](https://github.com/cassianobrexbit/dio-live-coding-serverless) contém códigos para o Node.JS 14 e hoje em 2025 a versão mínima do Node.JS na AWS é 18, logo parte dos códigos não funcionavam direito.

Usei o ChatGPT para adaptar os códigos para funcionar com a nova SDK. Abaixo inclusive, um resumo sobre isso.

# 🚀 Atualização para Node.js 18/22 no AWS Lambda

Este repositório foi atualizado para garantir compatibilidade com as versões **Node.js 18 e 22** no **AWS Lambda**. Abaixo estão as principais mudanças e ajustes realizados.

## 🔧 Principais mudanças

### 1️⃣ Migração para o AWS SDK v3  
- O SDK v2 (`aws-sdk`) foi substituído pelo **SDK v3** (`@aws-sdk/client-dynamodb` e `@aws-sdk/lib-dynamodb`).
- No SDK v3, as chamadas para o **DynamoDB** agora utilizam o novo **DocumentClient** (`DynamoDBDocumentClient`) e comandos específicos, como `GetCommand`, `PutCommand`, `DeleteCommand` e `ScanCommand`.

### 2️⃣ Uso de ES Modules (ECMAScript Modules)  
- Para suportar **import/export**, alteramos a estrutura dos arquivos:
  - Adicionamos `"type": "module"` no **package.json**.
  - Mudamos `require(...)` para `import { ... } from '...'` quando necessário.
- Arquivos `.js` continuam funcionando, mas para total compatibilidade, podem ser renomeados para `.mjs`.

### 3️⃣ Correção de acesso ao API Gateway  
- Extração de parâmetros do evento foi ajustada para `event.pathParameters.id` ao invés de `event.id`.

### 4️⃣ Ajustes nas respostas HTTP  
- Alteramos códigos de status para **seguir os padrões REST**:
  - `200 OK` para retornos bem-sucedidos.
  - `201 Created` para inserções.
  - `204 No Content` para exclusões.
  - `403 Forbidden` para falhas de permissão.

### 5️⃣ Correção de permissões no IAM  
- Atualizamos a **policy IAM** para garantir acesso correto às operações no **DynamoDB**.

## 📌 Exemplo de função Lambda atualizada

```javascript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    let responseBody = "";
    let statusCode = 0;

    try {
        const { id } = event.pathParameters;

        const params = {
            TableName: "dio_items",
            Key: { id },
        };

        const data = await documentClient.send(new GetCommand(params));
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    } catch (err) {
        responseBody = `Erro ao obter item: ${err}`;
        statusCode = 500;
    }

    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: responseBody,
    };
};
```

## 🔥 Benefícios das mudanças
✅ Código compatível com **Node.js 18 e 22**.  
✅ Melhor desempenho e segurança com **AWS SDK v3**.  
✅ Melhor organização do código com **ES Modules**.  
✅ Maior conformidade com padrões **REST**.  
✅ Correção de **permissões IAM** para evitar falhas de acesso.  
