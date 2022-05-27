const express = require('express');
const routes = express();

//Middleware
const handleRawPokedex = require('./middleware/handleRawPokedex');
const handlePokedex = require('./middleware/handlePokedex');

//Using these two middleware for populating the rawPokedex and the fullPokedex where I save all the info into my database instead of making requests to the PokeAPI;
routes.use(handleRawPokedex);
routes.use(handlePokedex);

//req function for testing
routes.get('/hey', (req, res) => {
    res.status(200).json({ message: 'I AM DONE' })
});


module.exports = routes;