const knex = require('../database/connection');
const fetch = require('node-fetch');

async function handleRawNationalPokedex(req, res, next) {
    try {
        const existingRawNationalPokedex = await
        knex('raw_national_pokedex')
            .select('*');

        if (existingRawNationalPokedex.length) return next();

        const rawPokedexRequest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1126');

        if (!rawPokedexRequest.ok) throw "Error on rawPokedexRequest";

        const { results } = await rawPokedexRequest.json();

        const insertingRawPokedex = await
        knex('raw_national_pokedex')
            .insert(results);

        return next();
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};


module.exports = handleRawNationalPokedex;