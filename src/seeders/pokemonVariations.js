const knex = require('../database/connection');

async function megasPokedex() {
    try {
        const megasPokedex = await knex('pokemon_variations')
            .select('*')
            .where('name', 'like', '%-mega');

        for (let megaPokemon of megasPokedex) {
            await knex('pokemon_megas').insert(megaPokemon);
        };
    } catch ({ message }) {
        return console.log({ message });
    };
};

async function gMaxPokedex() {
    try {
        const gingatamaxPokedex = await knex('pokemon_variations')
            .select('*')
            .where('name', 'like', '%-gmax');

        for (let gmaxPokemon of gingatamaxPokedex) {
            await knex('pokemon_gmax').insert(gmaxPokemon);
        };
    } catch ({ message }) {
        return console.log({ message });
    };
};

async function alolanFormsPokedex() {
    try {
        const alolanPokedex = await knex('pokemon_variations')
            .select('*')
            .where('name', 'like', '%-alola');

        for (let alolanPokemon of alolanPokedex) {
            await knex('pokemon_alolan').insert(alolanPokemon);
        };
    } catch ({ message }) {
        return console.log({ message });
    };
};

async function galarianFormsPokedex() {
    try {
        const galarianPokedex = await knex('pokemon_variations')
            .select('*')
            .where('name', 'like', '%-galar');

        for (let galarianPokemon of galarianPokedex) {
            await knex('pokemon_galarian').insert(galarianPokemon);
        };
    } catch ({ message }) {
        return console.log({ message });
    };
};

async function callVariations() {
    const galarianPokemon = await knex('pokemon_galarian')
        .select('*');
    if (galarianPokemon.length) return;

    megasPokedex();
    gMaxPokedex();
    alolanFormsPokedex();
    galarianFormsPokedex();
};


module.exports = callVariations;