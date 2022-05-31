const knex = require('../database/connection');

async function handlingRegionalPokedex(pokemonData) {
    try {
        await knex('national_pokedex')
            .insert(pokemonData);

        if (pokemonData.id <= 151) {
            await knex('kanto_pokedex')
                .insert(pokemonData);
        };
        if (pokemonData.id >= 152 && pokemonData.id <= 251) {
            await knex('johto_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.id >= 252 && pokemonData.id <= 386) {
            await knex('hoenn_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.id >= 387 && pokemonData.id <= 493) {
            await knex('sinnoh_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.id >= 494 && pokemonData.id <= 649) {
            await knex('unova_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.id >= 650 && pokemonData.id <= 721) {
            await knex('kalos_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.id >= 722 && pokemonData.id <= 809) {
            await knex('alola_pokedex')
                .insert(pokemonData);
        };

        if (pokemonData.id >= 810 && pokemonData.id <= 898) {
            await knex('galar_pokedex')
                .insert(pokemonData);
        };
    } catch (error) {
        return console.log(error);
    };
};


module.exports = handlingRegionalPokedex;