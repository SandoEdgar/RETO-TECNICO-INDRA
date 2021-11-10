const axios = require('axios');
const peopleModel = require('../../models/peopleModel');
const planetModel = require('../../models/planetMode');

const getPeople = async(number) => {

    try {
        const { data } = await axios({
            method: 'GET',
            url: `${process.env.URL_STARTWARS}/people/${number}`
        });

        const people = new peopleModel(
            data.name,
            data.height,
            data.mass,
            data.hair_color,
            data.skin_color,
            data.eye_color,
            data.birth_year,
            data.gender,
            data.homeworld,
            data.created,
            data.edited,
            data.url
        );

        return people;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    getPeople
}