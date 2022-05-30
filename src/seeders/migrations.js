const knex = require('../database/connection');
const schemas = require('../database/schemas');

async function runningMigrations() {
    try {
        const existingTables = await knex('national_pokedex')
            .select('*');

        if (existingTables.length) return;
    } catch ({ message }) {
        const executingQueries = await knex.raw(schemas);
        return;
    };
};

module.exports = {
    runningMigrations
};