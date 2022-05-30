const fetch = require('node-fetch');
const fs = require('fs/promises');
const path = require('path');

async function handleRawPokedex(req, res, next) {
    try {
        const JSONDATA = await fs.readFile(path.resolve(__dirname, '..', 'database/database.json'), 'utf-8');
        if (JSONDATA) return;

        const rawPokedexRequest = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1126');
        if (!rawPokedexRequest.ok) throw "Error on rawPokedexRequest";

        const { results } = await rawPokedexRequest.json();

        const kantoRegion = [];
        const johtoRegion = [];
        const hoennRegion = [];
        const sinnohRegion = [];
        const unovaRegion = [];
        const kalosRegion = [];
        const alolaRegion = [];
        const galarRegion = [];

        for (let result of results) {
            const { url } = result;
            const pokemonInfoRequest = await fetch(`${url}`);

            if (!pokemonInfoRequest.ok) continue;
            const pokemonInfoResponse = await pokemonInfoRequest.json();

            if (pokemonInfoResponse.id <= 151) {
                kantoRegion.push(pokemonInfoResponse);
            };

            if (pokemonInfoResponse.id >= 152 && pokemonInfoResponse.id <= 251) {
                johtoRegion.push(pokemonInfoResponse);
            };

            if (pokemonInfoResponse.id >= 252 && pokemonInfoResponse.id <= 386) {
                hoennRegion.push(pokemonInfoResponse);
            };

            if (pokemonInfoResponse.id >= 387 && pokemonInfoResponse.id <= 493) {
                sinnohRegion.push(pokemonInfoResponse);
            };

            if (pokemonInfoResponse.id >= 494 && pokemonInfoResponse.id <= 649) {
                unovaRegion.push(pokemonInfoResponse);
            };

            if (pokemonInfoResponse.id >= 650 && pokemonInfoResponse.id <= 721) {
                kalosRegion.push(pokemonInfoResponse);
            };

            if (pokemonInfoResponse.id >= 722 && pokemonInfoResponse.id <= 809) {
                alolaRegion.push(pokemonInfoResponse);
            };

            if (pokemonInfoResponse.id >= 810 && pokemonInfoResponse.id <= 898) {
                galarRegion.push(pokemonInfoResponse);
            };
        };

        const JSONDATABASE = {
            kantoRegion,
            hoennRegion,
            sinnohRegion,
            unovaRegion,
            kalosRegion,
            alolaRegion,
            galarRegion,
        };

        await fs.writeFile(path.resolve(__dirname, '..', 'database/database.json'), JSON.stringify(JSONDATABASE));
        console.log('end');
    } catch (error) {
        return console.log(error);
    };
};


module.exports = handleRawPokedex;