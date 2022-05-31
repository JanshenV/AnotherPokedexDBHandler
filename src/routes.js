const express = require('express');
const routes = express();

//Controllers
const {
    pokedexRegion
} = require('./controllers/pokedex');


routes.get('/pokedex/:region', pokedexRegion);

module.exports = routes;