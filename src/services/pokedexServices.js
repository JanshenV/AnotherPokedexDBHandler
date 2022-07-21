const knex = require('../database/connection');

//Util
const jsonParser = require('../util/jsonParser');

async function servicePokedexRegion(region) {
    try {
        let firstArgument = 0;
        let secondArgument = 0;

        if (region === 'kanto') {
            firstArgument = '151';
            secondArgument = '1';
        };

        if (region === 'johto') {
            firstArgument = '251';
            secondArgument = '152';
        };

        if (region === 'hoenn') {
            firstArgument = '386';
            secondArgument = '252';
        };

        if (region === 'sinnoh') {
            firstArgument = '493';
            secondArgument = '387';
        };

        if (region === 'unova') {
            firstArgument = '649';
            secondArgument = '494';
        };

        if (region === 'kalos') {
            firstArgument = '721';
            secondArgument = '650';
        };

        if (region === 'alola') {
            firstArgument = '809';
            secondArgument = '722';
        };

        if (region === 'galar') {
            firstArgument = '904';
            secondArgument = '810';
        };

        if (region === '*') {
            firstArgument = '904';
            secondArgument = '1';
        };

        const jsonPokedex = [];
        const pokedex = await knex('national_pokedex')
            .select('*')
            .where('dexnr', '<=', firstArgument)
            .andWhere('dexnr', '>=', secondArgument)
            .orderBy('dexnr');

        if (!pokedex.length) throw {
            message: 'Pokedex does not exist.',
            status: 404
        };

        for (let pokemon of pokedex) {
            const {
                jsonPokemonData, error
            } = await jsonParser(pokemon);

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
                .where({ dexnr: Number(name) })
                .first();
        };

        if (!findPokemon) throw {
            message: 'Pokémon does not exist.',
            status: 404
        };

        const {
            jsonPokemonData, error
        } = await jsonParser(findPokemon);

        if (error) throw {
            message: error,
            status: 500
        };

        let jsonPokemon = [];
        jsonPokemon.push(jsonPokemonData);

        return {
            PokemonData: jsonPokemonData
        };
    } catch (error) {
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