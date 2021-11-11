const Responses = require("../helpers/response/apiResponses");
const consumerApi = require('../helpers/consumers/starwars');
const dynamo = require("../database/dynamoDB");
const md5 = require('md5');
const sortBtId = require('../util/sortBtId');
const postsTablePlanet = process.env.POST_TABLE_PLANET || 'planet';

module.exports.createPlanet = async(event, context, callback) => {
    try {
        const numberPlanet = event.pathParameters.number;
        const res = await dynamo.getByID(md5(numberPlanet), postsTablePlanet);
        if (!res || !res.Item) {
            const planetConsumer = await consumerApi.getPlanet(numberPlanet);
            if (planetConsumer) {
                const post = {
                    id: md5(numberPlanet),
                    createdAt: new Date().toISOString(),
                    type: 2, // indicando que es para planets
                    ...planetConsumer
                }
                await dynamo.saveItem(postsTablePlanet, post);
                return callback(null, Responses._201(post));
            }
        } else {
            return callback(null, Responses._200(res.Item));
        }

    } catch (error) {
        callback(null, Responses._500(error));
    }
};

module.exports.getAllPlanets = async(event, context, callback) => {
    try {
        const res = await dynamo.getAll(postsTablePlanet);
        return callback(null, Responses._200(res.Items.sort(sortBtId)))
    } catch (error) {
        return callback(null, Responses._500({ msm: error }));
    }
};

module.exports.updatePlanet = async(event, context, callback) => {
    try {
        const idPlanet = event.pathParameters.id;
        const { paramName, paramValue } = JSON.parse(event.body);

        await dynamo.updateItem(idPlanet, postsTablePlanet, paramName, paramValue);
        return callback(null, Responses._200({ message: 'Actualizado con éxito' }));
    } catch (error) {
        return callback(null, Responses._500(error))
    }
};

module.exports.deletePlanet = async(event, context, callback) => {
    try {
        const idPlanet = event.pathParameters.id;
        await dynamo.deleteItem(idPlanet, postsTablePlanet);
        return callback(null, Responses._200({ message: 'Eliminado con éxito' }));
    } catch (error) {
        return callback(null, Responses._500(error))
    }
};