const express = require('express');
const routes = express();

//Controllers
const {
    regionalPokedex
} = require('./controllers/pokedex');


routes.post('/regionalPokedex', regionalPokedex);


module.exports = routes;