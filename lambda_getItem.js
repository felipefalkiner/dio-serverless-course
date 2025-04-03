const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event, context) => {
    let responseBody = "";
    let statusCode = 0;

    try {
        const { id } = event.pathParameters; // Pegando corretamente o ID da URL

        if (!id) {
            throw new Error("ID não fornecido");
        }

        const params = {
            TableName: "dio_items",
            Key: {
                id
            }
        };

        const data = await documentClient.send(new GetCommand(params));

        if (data.Item) {
            responseBody = JSON.stringify(data.Item);
            statusCode = 200;
        } else {
            responseBody = JSON.stringify({ message: "Item não encontrado" });
            statusCode = 404;
        }

    } catch (err) {
        responseBody = `Falha ao obter item: ${err.message}`;
        statusCode = 500;
    }

    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };
};
