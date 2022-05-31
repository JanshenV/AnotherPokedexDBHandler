const knex = require('../database/connection');

async function variationsPokedex(variationName) {
    if (!variationName) return { error: 'VariationName is required.' };

    try {
        const variationPokedex = await knex('pokemon_variations')
            .select('*')
            .where('name', 'like', `%-${variationName}`);

        return { variationPokedex };
    } catch (error) {
        return { error };
    };
};

module.exports = variationsPokedex;