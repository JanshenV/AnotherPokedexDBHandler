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

        for (let pokemon of pokedex) {
            const {
                jsonPokemonData, error
            } = await jsonParser(pokemon);

            if (error) throw error;

            jsonPokedex.push(jsonPokemonData);
        };

        return res.status(200).json(jsonPokedex);
    } catch (error) {
        return res.status(500).json(error);
    };
};

module.exports = {
    pokedexRegion
};