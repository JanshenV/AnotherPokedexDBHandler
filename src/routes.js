const express = require('express');
const routes = express();

//Middleware
const handleRawPokedex = require('./middleware/handleRawPokedex');
const handleNationalDex = require('./middleware/handleNationalPokedex');

//National Pokedex
routes.use(handleRawPokedex);
routes.use(handleNationalDex);

//req function for testing
routes.get('/hey', async(req, res) => {

    res.status(200).json({ kantoDex })
});


module.exports = routes;