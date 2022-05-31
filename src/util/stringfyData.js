async function stringfyData(data) {
    try {
        const {
            abilities, forms,
            moves, types,
            sprites, species,
            stats
        } = data;

        const stringfiedData = {
            ...data,
            abilities: JSON.stringify(abilities),
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