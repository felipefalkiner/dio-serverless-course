const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event, context) => {
    let responseBody = "";
    let statusCode = 0;

    const {id, itemName, itemPrice} = JSON.parse(event.body);

    const params = {
        TableName: "dio_items",
        Item: {
            id,
            itemName,
            itemPrice
        }
    };

    try {
        await documentClient.send(new PutCommand(params));
        responseBody = JSON.stringify({ message: "Item inserido com sucesso" });
        statusCode = 201;
    } catch (err) {
        responseBody = `Falha ao inserir item: ${err}`;
        statusCode = 403;
    }

    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: responseBody
    };
};
