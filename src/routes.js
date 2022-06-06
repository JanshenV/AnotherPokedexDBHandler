const express = require('express');
const routes = express();

//Controllers
const {
    pokedexRegion,
    pokemonVariation,
    individualPokemon
} = require('./controllers/pokedex');

routes.get('/', (req, res) => {
    return res.status(200).json('Welcome to anotherPokedex');
});
routes.get('/pokedex/:region', pokedexRegion);
routes.get('/pokemon/:pokemonName', individualPokemon);
routes.get('/variations/:pokemonName', pokemonVariation);
routes.get('/', (req, res) => {
    return res.status(200).json('Welcome to anotherPokedex');
});

module.exports = routes;
