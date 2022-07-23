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

        const rawPokedexRequest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
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
            if (stringfyError) throw stringfyError;

            const formatedPokemonData = {
                name: stringfiedData.name,
                nationaldex: stringfiedData.nationaldex,
                regionaldex: stringfiedData.regionaldex,
                all_dex_numbers: stringfiedData.all_dex_numbers,
                types: stringfiedData.types,
                descriptions: stringfiedData.descriptions,
                habitat: stringfiedData.habitat,
                species: stringfiedData.species,
                weight: stringfiedData.weight,
                height: stringfiedData.height,
                location_area_encounters: stringfiedData.location_area_encounters,
                abilities: stringfiedData.abilities,
                moves: stringfiedData.moves,
                evolutions: stringfiedData.evolutions,
                forms: stringfiedData.forms,
                varieties: stringfiedData.varieties,
                sprites: stringfiedData.sprites,
                legendary: stringfiedData.legendary,
                mythical: stringfiedData.mythical,
                stats: stringfiedData.stats
            };

            if (formatedPokemonData.nationaldex >= 905) {
                await knex('pokemon_variations')
                    .insert(formatedPokemonData);
            } else {
                await knex('national_pokedex')
                    .insert(formatedPokemonData);
            };
        };
    } catch (error) {
        console.log(error)
        return error;
    };
};

async function fetchingData() {
    await fetchRawPokedex();
    await handleNationalPokedex();
};

module.exports = fetchingData;