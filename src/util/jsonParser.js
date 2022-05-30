async function jsonParser(pokemonData) {
    try {
        const {
            abilities, forms, game_indices,
            held_items, moves, species,
            sprites, stats, types
        } = pokemonData;

        const jsonAbilities = await JSON.parse(abilities);
        const jsonForms = await JSON.parse(forms);
        const jsonGameIndices = await JSON.parse(game_indices);
        const jsonHeldItems = await JSON.parse(held_items);
        const jsonMoves = await JSON.parse(moves);
        const jsonSpecies = await JSON.parse(species);
        const jsonSprites = await JSON.parse(sprites);
        const jsonStats = await JSON.parse(stats);
        const jsonTypes = await JSON.parse(types);

        const jsonPokemonData = {
            ...pokemonData,
            abilities: jsonAbilities,
            forms: jsonForms,
            game_indices: jsonGameIndices,
            held_items: jsonHeldItems,
            moves: jsonMoves,
            species: jsonSpecies,
            sprites: jsonSprites,
            stats: jsonStats,
            types: jsonTypes
        };

        return { jsonPokemonData };
    } catch (error) {
        return { error };
    };
};

module.exports = jsonParser;