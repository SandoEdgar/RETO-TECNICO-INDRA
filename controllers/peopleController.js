const Responses = require("../helpers/response/apiResponses");
const consumerApi = require('../helpers/consumers/starwars');
const dynamo = require("../database/dynamoDB");
const md5 = require('md5');
const sortBtId = require('../util/sortBtId');
const postsTablePeople = process.env.POST_TABLE_PEOPLE || 'people';

module.exports.createPeople = async(event, context, callback) => {
    try {

        const numberPeople = event.pathParameters.number;
        const res = await dynamo.getByID(md5(numberPeople), postsTablePeople);

        if (!res || !res.Item) {

            const peopleConsumer = await consumerApi.getPeople(numberPeople);

            if (peopleConsumer) {
                const post = {
                    id: md5(numberPeople),
                    createdAt: new Date().toISOString(),
                    type: 1,
                    ...peopleConsumer
                }
                await dynamo.saveItem(postsTablePeople, post);
                return callback(null, Responses._201(post));
            }
        } else {
            return callback(null, Responses._200(res.Item));
        }

    } catch (error) {
        callback(null, Responses._500(error));
    }
};


module.exports.updatePeople = async(event, context, callback) => {
    try {
        const idPost = md5(event.pathParameters.id);
        const { paramName, paramValue } = JSON.parse(event.body);

        await dynamo.updateItem(idPost, postsTablePeople, paramName, paramValue);
        return callback(null, Responses._200({ message: 'Se actualizó con éxito' }));
    } catch (error) {
        return callback(null, Responses._500(error))
    }
};


module.exports.deletePeople = async(event, context, callback) => {
    try {
        const idPost = md5(event.pathParameters.id);
        await dynamo.deleteItem(idPost, postsTablePeople);
        return callback(null, Responses._200({ message: 'Se eliminó con éxito' }));
    } catch (error) {
        return callback(null, Responses._500(error));
    }
};


module.exports.getAllPeople = async(event, context, callback) => {
    try {
        const res = await dynamo.getAll(postsTablePeople, 1);
        return callback(null, Responses._200(res.Items.sort(sortBtId)));
    } catch (error) {
        return callback(null, Responses._500({ msm: error }));
    }
};