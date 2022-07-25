const knex = require('../database/connection');

//Util
const jsonParser = require('../util/jsonParser');
const argumentsHandler = require('../util/argumentsHandler.js');


async function servicePokedexRegion(region) {
    try {
        const pokedex = await knex('national_pokedex')
            .select('*')
            .where('nationaldex', '<=', argumentsHandler[region]().first)
            .andWhere('nationaldex', '>=', argumentsHandler[region]().second)
            .orderBy('nationaldex');

        if (!pokedex.length) throw {
            message: 'Pokedex does not exist.',
            status: 404
        };

        const jsonPokedex = [];
        for (let pokemon of pokedex) {
            const {
                jsonPokemonData, error
            } = jsonParser(pokemon);

            if (error) throw {
                error,
                status: 500
            };

            jsonPokedex.push(jsonPokemonData);
        };
        return {
            RegionalPokedex: jsonPokedex
        };
    } catch (error) {
        return {
            serviceError: error
        }
    };
};

async function serviceIndividualPokemon(name) {
    try {
        let findPokemon;

        if (!Number(name)) {
            findPokemon = await knex('national_pokedex')
                .where({ name })
                .first();
        };

        if (Number(name)) {
            findPokemon = await knex('national_pokedex')
                .where({ nationaldex: Number(name) })
                .first();
        };

        if (!findPokemon) throw {
            message: 'Pokémon does not exist.',
            status: 404
        };

        const {
            jsonPokemonData, error
        } = jsonParser(findPokemon);

        if (error) throw {
            message: error,
            status: 500
        };

        let jsonPokemon = [];
        jsonPokemon.push(jsonPokemonData);
        return {
            PokemonData: jsonPokemon
        };
    } catch (error) {
        console.log(error);
        return {
            serviceError: error
        };
    };
};

async function servicePokemonVariations(name) {
    try {
        const pokemonVariations = await knex('pokemon_variations')
            .select('*')
            .where('name', 'like', `${name}-%`);

        if (!pokemonVariations.length) throw {
            message: 'Variations or Pokémon or do not exist.',
            status: 404
        };

        const jsonPokemonVariations = [];
        for (let pokemon of pokemonVariations) {
            const {
                jsonPokemonData, error
            } = await jsonParser(pokemon);

            if (error) throw {
                message: error,
                status: 500
            };

            jsonPokemonVariations.push(jsonPokemonData);
        };

        return {
            PokemonVariations: jsonPokemonVariations
        };
    } catch (error) {
        return {
            serviceError: error
        };
    };
};

module.exports = {
    servicePokedexRegion,
    serviceIndividualPokemon,
    servicePokemonVariations
};