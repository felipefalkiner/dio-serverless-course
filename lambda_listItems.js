const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event, context) => {
    let responseBody = "";
    let statusCode = 0;

    //const {id, itemName, itemPrice} = JSON.parse(event.body);

    const params = {
        TableName: "dio_items"
    };

    try {
        const data = await documentClient.send(new ScanCommand(params));
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch (err) {
        responseBody = `Falha ao listar itens: ${err}`;
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
