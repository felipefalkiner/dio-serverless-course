const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event, context) => {
    let responseBody = "";
    let statusCode = 0;

    const {id} = event.pathParameters;

    const params = {
        TableName: "dio_items",
        Key: {
            id
        }
    };

    try {
        const data = await documentClient.send(new DeleteCommand(params));
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (err) {
        responseBody = `Falha ao excluir item: ${err}`;
        statusCode = 403;
    }

    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };
};
