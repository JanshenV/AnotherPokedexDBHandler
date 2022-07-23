function stringfyData(data) {
    try {
        const {
            abilities, forms, all_dex_numbers,
            moves, types, descriptions,
            sprites, species, evolutions,
            stats, varieties
        } = data;
        const stringfiedData = {
            ...data,
            abilities: JSON.stringify(abilities),
            all_dex_numbers: JSON.stringify(all_dex_numbers),
            descriptions: JSON.stringify(descriptions),
            evolutions: JSON.stringify(evolutions),
            varieties: JSON.stringify(varieties),
            forms: JSON.stringify(forms),
            types: JSON.stringify(types),
            moves: JSON.stringify(moves),
            sprites: JSON.stringify(sprites),
            species: JSON.stringify(species),
            stats: JSON.stringify(stats),
        };
        return { stringfiedData };
    } catch (error) {
        return { error };
    };
};

module.exports = stringfyData;