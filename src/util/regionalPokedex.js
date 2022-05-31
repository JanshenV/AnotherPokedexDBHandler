const knex = require('../database/connection');

async function handlingRegionalPokedex(pokemonData) {
    try {
        await knex('national_pokedex')
            .insert(pokemonData);

        if (pokemonData.dexnr <= 151) {
            await knex('kanto_pokedex')
                .insert(pokemonData);
        };
        if (pokemonData.dexnr >= 152 && pokemonData.dexnr <= 251) {
            await knex('johto_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.dexnr >= 252 && pokemonData.dexnr <= 386) {
            await knex('hoenn_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.dexnr >= 387 && pokemonData.dexnr <= 493) {
            await knex('sinnoh_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.dexnr >= 494 && pokemonData.dexnr <= 649) {
            await knex('unova_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.dexnr >= 650 && pokemonData.dexnr <= 721) {
            await knex('kalos_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.dexnr >= 722 && pokemonData.dexnr <= 809) {
            await knex('alola_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.dexnr >= 810 && pokemonData.dexnr <= 898) {
            await knex('galar_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.dexnr >= 899) {
            await knex('pokemon_variations')
                .insert(pokemonData);
        };

    } catch (error) {
        return console.log(error);
    };
};


module.exports = handlingRegionalPokedex;