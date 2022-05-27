const knex = require('../database/connection');
const fetch = require('node-fetch');

async function handleRawPokedex(req, res, next) {
    try {
        const existingRawData = await knex('raw_whole_pokedex')
            .select('*');

        if (existingRawData.length) return next();
        const rawPokedexRequest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0');

        if (!rawPokedexRequest.ok) throw "Error on rawPokedexRequest";

        const { results } = await rawPokedexRequest.json();

        const insertingRawPokedex = await knex('raw_whole_pokedex')
            .insert(results);

        return next();
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};


module.exports = handleRawPokedex;