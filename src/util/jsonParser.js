function jsonParser(pokemonData) {
    try {
        const {
            abilities, forms, evolutions,
            moves, species, varieties,
            sprites, stats, types,
            all_dex_numbers, descriptions
        } = pokemonData;

        const jsonAbilities = JSON.parse(abilities);
        const jsonAll_dex_numbers = JSON.parse(all_dex_numbers);
        const jsonDescriptions = JSON.parse(descriptions);
        const jsonEvolutions = JSON.parse(evolutions);
        const jsonVarieties = JSON.parse(varieties);
        const jsonForms = JSON.parse(forms);
        const jsonMoves = JSON.parse(moves);
        const jsonSpecies = JSON.parse(species);
        const jsonSprites = JSON.parse(sprites);
        const jsonStats = JSON.parse(stats);
        const jsonTypes = JSON.parse(types);

        const jsonPokemonData = {
            ...pokemonData,
            abilities: jsonAbilities,
            all_dex_numbers: jsonAll_dex_numbers,
            descriptions: jsonDescriptions,
            evolutions: jsonEvolutions,
            varieties: jsonVarieties,
            forms: jsonForms,
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