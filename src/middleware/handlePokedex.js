const knex = require('../database/connection');
const fetch = require('node-fetch');

async function handlePokedex(req, res, next) {
    try {
        const existingPokedex = await knex('whole_pokedex')
            .select('*');

        if (existingPokedex.length) return next();

        const rawPokedex = await knex('raw_whole_pokedex')
            .select('url');

        for (let pokemonUrl of rawPokedex) {
            const { url } = pokemonUrl;
            const pokemonRequest = await fetch(`${url}`);

            if (!pokemonRequest.ok) throw "error on fetching individual pokemon";

            const {
                abilities,
                base_experience,
                forms,
                game_indices,
                height,
                held_items,
                id: dexid,
                is_default,
                location_area_encounters,
                moves,
                species,
                sprites,
                stats,
                types,
                weight
            } = await pokemonRequest.json();

            const stringFyAbilities = JSON.stringify(abilities);
            const stringFyForms = JSON.stringify(forms);
            const stringFyGameIndices = JSON.stringify(game_indices);
            const stringFyHeldItems = JSON.stringify(held_items);
            const stringFyLocationArea = JSON.stringify(location_area_encounters);
            const stringFyMoves = JSON.stringify(moves);
            const stringFySpecies = JSON.stringify(species);
            const stringFySprites = JSON.stringify(sprites);
            const stringFyTypes = JSON.stringify(types);
            const stringFyStats = JSON.stringify(stats);


            await knex('whole_pokedex')
                .insert({
                    abilities: stringFyAbilities,
                    base_xp: base_experience,
                    forms: stringFyForms,
                    game_indices: stringFyGameIndices,
                    height,
                    held_items: stringFyHeldItems,
                    dexid,
                    is_default,
                    location_area_encounters: stringFyLocationArea,
                    moves: stringFyMoves,
                    species: stringFySpecies,
                    sprites: stringFySprites,
                    stats: stringFyStats,
                    types: stringFyTypes,
                    weight
                });
        };

        next();
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};

module.exports = handlePokedex;