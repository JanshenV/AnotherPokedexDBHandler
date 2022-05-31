const knex = require('../database/connection');
const fetch = require('node-fetch');

//Util
const filteringPokemonData = require('../util/dataFilter');
const stringfyData = require('../util/stringfyData');
const handlingRegionalPokedex = require('../util/regionalPokedex');

async function fetchingRaw() {
    try {
        const existingRawPokedex = await knex('raw_pokedex')
            .select('*');
        if (existingRawPokedex.length) return;

        const rawPokedexRequest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0');
        if (!rawPokedexRequest.ok) throw `Error fetching rawPokedex`;

        const { results } = await rawPokedexRequest.json();

        for (let { name, url: pokemonurl } of results) {
            await knex('raw_pokedex').insert({
                name,
                pokemonurl
            });
        };
    } catch ({ message }) {
        return console.log({ message });
    };
};

async function fetchingFromRaw() {
    try {
        const rawPokedex = await knex('raw_pokedex')
            .select('*');
        if (!rawPokedex.length) throw 'Raw pokedex is empty';

        const national_pokedex = await knex('national_pokedex')
            .select('*');

        if (national_pokedex.length) return;

        for (let rawPokemon of rawPokedex) {
            const { pokemonurl: url } = rawPokemon;

            const pokemonUrlRequest = await fetch(url);
            if (!pokemonUrlRequest.ok) throw "Pokemon url request error";

            const pokemonUrlResponse = await pokemonUrlRequest.json();
            const {
                newPokemonData, error: filteringError
            } = await filteringPokemonData(pokemonUrlResponse);
            if (filteringError) throw filteringError;

            const {
                stringfiedData, error: stringfyError
            } = await stringfyData(newPokemonData);
            if (stringfyError) throw stringfyError;

            const formatedValueForDb = {
                name: stringfiedData.name,
                dexnr: stringfiedData.dexnr,
                weight: stringfiedData.weight,
                height: stringfiedData.height,
                location_area_encounters: stringfiedData.location_area_encounters,
                abilities: stringfiedData.abilities,
                forms: stringfiedData.forms,
                species: stringfiedData.species,
                moves: stringfiedData.moves,
                types: stringfiedData.types,
                stats: stringfiedData.stats,
                sprites: stringfiedData.sprites,
            };
            await handlingRegionalPokedex(formatedValueForDb);
        };
    } catch ({ message }) {
        return console.log({ message });
    };
};

async function fetchingData() {
    await fetchingRaw();
    await fetchingFromRaw();
};

module.exports = fetchingData;