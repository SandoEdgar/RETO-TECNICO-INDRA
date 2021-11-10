const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const Dynamo = {

    async saveItem(TableName, Item) {
        const data = await db.put({
            TableName: TableName,
            Item
        }).promise();

        return data;
    },

    async getByID(id, TableName) {
        const data = await db.get({
            TableName: TableName,
            Key: {
                id
            }
        }).promise();

        return data;
    },

    async getAll(TableName, type) {
        const data = await db.scan({
            TableName: TableName,
            Key: {
                type
            }
        }).promise();

        return data;
    },

    async updateItem(id, TableName, KeyAttribute, KeyValue) {
        const data = await db.update({
            TableName: TableName,
            Key: { id },
            UpdateExpression: `set ${KeyAttribute} = :v`,
            ExpressionAttributeValues: {
                ':v': KeyValue
            }
        }).promise();

        return data;
    },

    async deleteItem(id, TableName) {
        const data = await db.delete({
            TableName: TableName,
            Key: { id }
        }).promise();

        return data;
    },

    async getItemLimit(TableName, Limit) {
        const data = await db.scan({
            TableName: TableName,
            Limit
        }).promise();

        return data;
    }
}

module.exports = Dynamo;