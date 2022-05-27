const knex = require('../database/connection');

async function handleKantoPokedex(req, res, next) {
    try {
        const existingKantoPokedex = await knex('kanto_pokedex')
            .select('*');

        if (existingKantoPokedex.length) return next();

        const nationalPokedex = await knex('national_pokedex')
            .select('*')
            .limit(151)
            .offset(0);

        await knex('kanto_pokedex')
            .insert(nationalPokedex);

    } catch ({ message }) {
        return res.status(500).json({ message });
    };
};


module.exports = {
    handleKantoPokedex
};