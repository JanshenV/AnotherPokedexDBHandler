const { json } = require('express/lib/response');
const knex = require('../database/connection');

//Util
const jsonParser = require('../util/jsonParser');

async function regionalPokedex(req, res) {
    const { region } = req.query;
    if (!region) return res.status(400).json({
        message: 'Region is mandatory.'
    });


    try {
        const regionPokedex = await knex(region)
            .select('*');

        const jsonRegionPokedex = [];

        for (let pokemon of regionPokedex) {
            const {
                jsonPokemonData, error
            } = await jsonParser(pokemon);

            if (error) return res.status(500).json({ error });

            jsonRegionPokedex.push(jsonPokemonData);
        };

        return res.status(200).json(jsonRegionPokedex);
    } catch (error) {
        return res.status(500).json({ error });
    };
};


module.exports = {
    regionalPokedex
};