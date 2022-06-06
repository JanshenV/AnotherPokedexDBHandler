const express = require('express');
const routes = express();

//Controllers
const {
    pokedexRegion,
    pokemonVariation,
    individualPokemon
} = require('./controllers/pokedex');


routes.get('/pokedex/:region', pokedexRegion);
routes.get('/pokedex/:pokemonName', individualPokemon);
routes.get('/variations/:pokemonName', pokemonVariation);

module.exports = routes;