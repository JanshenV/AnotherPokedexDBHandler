const knex = require('../database/connection');
const fetch = require('node-fetch');

async function fetchingRaw() {
    try {
        const existingRawPokedex = await knex('raw_pokedex')
            .select('*');
        if (existingRawPokedex.length) return;

        const rawPokedexRequest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0');
        if (!rawPokedexRequest.ok) throw `Error fetching rawPokedex`;

        const { results } = await rawPokedexRequest.json();

        for (let { name: rawName, url } of results) {
            let rawPokemon = {
                name: rawName,
                pokemonurl: url
            };
            await knex('raw_pokedex').insert(rawPokemon);

            const pokemonInfoRequest = await fetch(`${url}`);

            if (!pokemonInfoRequest.ok) throw 'Error fetching individual pokemon';

            const {
                name, height, id: dex_id,
                base_experience, is_default, location_area_encounters,
                weight,
                abilities, forms, game_indices, held_items,
                moves, species, sprites,
                stats, types
            } = await pokemonInfoRequest.json();

            const stringAbilities = JSON.stringify(abilities);
            const stringForms = JSON.stringify(forms);
            const stringGameIndices = JSON.stringify(game_indices);
            const stringHeldItems = JSON.stringify(held_items);
            const stringMoves = JSON.stringify(moves);
            const stringSpecies = JSON.stringify(species);
            const stringSprites = JSON.stringify(sprites);
            const stringStats = JSON.stringify(stats);
            const stringTypes = JSON.stringify(types);

            const pokemonInfoData = {
                name, height, dex_id,
                base_experience, is_default, location_area_encounters,
                weight,
                abilities: stringAbilities,
                forms: stringForms,
                game_indices: stringGameIndices,
                held_items: stringHeldItems,
                moves: stringMoves,
                species: stringSpecies,
                sprites: stringSprites,
                stats: stringStats,
                types: stringTypes
            };

            await knex('national_pokedex').insert(pokemonInfoData);

            if (dex_id <= 151) {
                await knex('kanto_pokedex').insert(pokemonInfoData);
            };

            if (dex_id >= 152 && dex_id <= 251) {
                await knex('johto_pokedex').insert(pokemonInfoData);
            };

            if (dex_id >= 252 && dex_id <= 386) {
                await knex('hoenn_pokedex').insert(pokemonInfoData);
            };

            if (dex_id >= 387 && dex_id <= 493) {
                await knex('sinnoh_pokedex').insert(pokemonInfoData);
            };

            if (dex_id >= 494 && dex_id <= 649) {
                await knex('unova_pokedex').insert(pokemonInfoData);
            };

            if (dex_id >= 650 && dex_id <= 721) {
                await knex('kalos_pokedex').insert(pokemonInfoData);
            };

            if (dex_id >= 722 && dex_id <= 809) {
                await knex('alola_pokedex').insert(pokemonInfoData);
            };

            if (dex_id >= 810 && dex_id <= 898) {
                await knex('alola_pokedex').insert(pokemonInfoData);
            };

            if (dex_id > 898) {
                await knex('raw_forms_variations_pokedex').insert(pokemonInfoData);
            };
        };
    } catch ({ message }) {
        return console.log({ message });
    };
};



module.exports = {
    fetchingRaw,
};