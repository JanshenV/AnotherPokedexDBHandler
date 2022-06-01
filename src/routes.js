const express = require('express');
const routes = express();

//Controllers
const {
    pokedexRegion,
    pokemonVariation
} = require('./controllers/pokedex');


routes.get('/pokedex/:region', pokedexRegion);
routes.get('/variations/:pokemonName', pokemonVariation);
routes.get('/', (req, res) => {
    return res.status(200).json('Welcome to anotherPokedex');
});

module.exports = routes;