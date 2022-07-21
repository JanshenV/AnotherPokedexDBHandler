const knex = require('../database/connection');

//Util
const jsonParser = require('../util/jsonParser');

async function pokedexRegion(req, res) {
    let { region } = req.params;

    if (!region) return res.status(400).json({
        message: 'Region is required'
    });

    region = region.toLowerCase();

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
            firstArgument = '898';
            secondArgument = '810';
        };

        if (region === '*') {
            firstArgument = '898';
            secondArgument = '1';
        };

        const jsonPokedex = [];
        const pokedex = await knex('national_pokedex')
            .select('*')
            .where('dexnr', '<=', firstArgument)
            .andWhere('dexnr', '>=', secondArgument)
            .orderBy('dexnr');

        if (!pokedex.length) return res.status(404).json({
            message: 'Pokedex does not exist.'
        });

        for (let pokemon of pokedex) {
            const {
                jsonPokemonData, error
            } = await jsonParser(pokemon);

            if (error) throw error;

            jsonPokedex.push(jsonPokemonData);
        };
        res.set('Cache-Control', 'public, max-age=604800');
        return res.status(200).json(jsonPokedex);
    } catch (error) {
        return res.status(500).json(error);
    };
};

async function individualPokemon(req, res) {
    const { pokemonName } = req.params;

    if (!pokemonName) return res.status(404).json({
        message: "Pokemon's name is required."
    });

    try {
        let findPokemon = await knex('national_pokedex')
            .where({ name: pokemonName })
            .first();

        if (!findPokemon) {
            findPokemon = await knex('national_pokedex')
                .where({ dexnr: pokemonName })
                .first();
            if (!findPokemon) return res.status(404).json({
                message: 'Pokemon does not exist',
            });
        };

        const {
            jsonPokemonData, error
        } = await jsonParser(findPokemon);

        if (error) throw error;

        let jsonPokemon = [];
        jsonPokemon.push(jsonPokemonData);

        res.set('Cache-Control', 'public, max-age=604800');
        return res.status(200).json(jsonPokemon);
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};

async function pokemonVariation(req, res) {
    const { pokemonName } = req.params;

    if (!pokemonName) return res.status(400).json({
        message: 'pokemonName is required.'
    });

    try {
        const pokemonVariations = await knex('pokemon_variations')
            .select('*')
            .where('name', 'like', `${pokemonName}-%`);

        if (!pokemonVariations.length) return res.status(404).json({
            message: 'Pokemon does not exist.'
        });

        const jsonPokemonVariations = [];

        for (let pokemon of pokemonVariations) {
            const {
                jsonPokemonData, error
            } = await jsonParser(pokemon);

            if (error) throw error;

            jsonPokemonVariations.push(jsonPokemonData);
        };
        res.set('Cache-Control', 'public, max-age=604800');
        return res.status(200).json(jsonPokemonVariations);
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};

module.exports = {
    pokedexRegion,
    individualPokemon,
    pokemonVariation
};