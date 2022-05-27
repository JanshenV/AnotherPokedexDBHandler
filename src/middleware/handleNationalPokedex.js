const knex = require('../database/connection');
const fetch = require('node-fetch');

async function handleRegionalDex(region, data) {
    await knex(region)
        .insert(data);
};

async function handleNationalDex(req, res, next) {
    try {
        const rawNationalPokedex = await knex('raw_national_pokedex')
            .select('url');

        if (!rawNationalPokedex.length) throw "Raw Dex is empty";

        const nationalPokedex = await knex('national_pokedex')
            .select('*');
        if (nationalPokedex.length) return next();

        for (let pokemonUrl of rawNationalPokedex) {
            const { url } = pokemonUrl;
            const pokemonRequest = await fetch(`${url}`);

            if (!pokemonRequest.ok) throw "error on fetching individual pokemon";

            const {
                name,
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

            const pokedexData = {
                name,
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
            };

            await knex('national_pokedex')
                .insert(pokedexData);

            if (dexid <= 151) {
                handleRegionalDex('kanto_pokedex', pokedexData);
            };

            if (dexid >= 152 && dexid <= 251) {
                handleRegionalDex('johto_pokedex', pokedexData);
            };

            if (dexid >= 252 && dexid <= 386) {
                handleRegionalDex('hoenn_pokedex', pokedexData);
            };

            if (dexid >= 387 && dexid <= 493) {
                handleRegionalDex('sinnoh_pokedex', pokedexData);
            };

            if (dexid >= 494 && dexid <= 649) {
                handleRegionalDex('unova_pokedex', pokedexData);
            };

            if (dexid >= 650 && dexid <= 721) {
                handleRegionalDex('kalos_pokedex', pokedexData);
            };

            if (dexid >= 722 && dexid <= 809) {
                handleRegionalDex('alola_pokedex', pokedexData);
            };

            if (dexid >= 810 && dexid <= 905) {
                handleRegionalDex('galar_pokedex', pokedexData);
            };
        };

        next();
    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};

module.exports = handleNationalDex;