const knex = require('../database/connection');

//Util
const jsonParser = require('../util/jsonParser');

async function pokedexRegion(req, res) {
    const { region } = req.params;

    if (!region) return res.status(400).json({
        message: 'Region is required'
    });

    try {
        const regionalPokedex = await knex(`${region}`)
            .select('*');

        const jsonRegionalPokedex = [];

        for (let pokemon of regionalPokedex) {
            const {
                jsonPokemonData, error
            } = await jsonParser(pokemon);

            if (error) throw error;

            jsonRegionalPokedex.push(jsonPokemonData);
        };

        return res.status(200).json(jsonRegionalPokedex);
    } catch (error) {
        return res.status(500).json(error);
    };
};

module.exports = {
    pokedexRegion
};