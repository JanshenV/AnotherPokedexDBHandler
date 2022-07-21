const knex = require('../database/connection');
const fetch = require('node-fetch');

//Util
const filteringPokemonData = require('../util/dataFilter');
const stringfyData = require('../util/stringfyData');


async function fetchRawPokedex() {
    try {
        const existingRawPokedex = await knex('raw_pokedex')
            .select('*');

        if (existingRawPokedex.length) return;

        const rawPokedexRequest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1154&offset=0');
        if (!rawPokedexRequest.ok) throw `Error fetching rawPokedex`;

        const { results } = await rawPokedexRequest.json();

        for (let { name, url: pokemonurl } of results) {
            await knex('raw_pokedex').insert({
                name,
                pokemonurl
            });
        };
    } catch (error) {
        return error;
    };
};

async function handleNationalPokedex() {
    try {
        const rawPokedex = await knex('raw_pokedex')
            .select('*');
        if (!rawPokedex.length) throw 'Raw pokedex is empty';

        const nationalPokedex = await knex('national_pokedex')
            .select('*');

        if (nationalPokedex.length) return;

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
            if (stringfyError) throw new stringfyError;

            const formatedPokemonData = {
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

            if (formatedPokemonData.dexnr >= 905) {
                await knex('pokemon_variations')
                    .insert(formatedPokemonData);
            } else {
                await knex('national_pokedex')
                    .insert(formatedPokemonData);
            };
        };
    } catch (error) {
        return error;
    };
};

async function fetchingData() {
    await fetchRawPokedex();
    await handleNationalPokedex();
};

module.exports = fetchingData;