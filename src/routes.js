const express = require('express');
const routes = express();

//Middleware
const handleRawPokedex = require('./middleware/handleRawPokedex');
const handleNationalDex = require('./middleware/handleNationalPokedex');
const {
    handleKantoPokedex
} = require('./middleware/regionalPokedex');

//National Pokedex
routes.use(handleRawPokedex);
routes.use(handleNationalDex);

//Regional Pokedex
routes.use(handleKantoPokedex);


//req function for testing
routes.get('/hey', (req, res) => {
    res.status(200).json({ message: 'I AM DONE' })
});


module.exports = routes;