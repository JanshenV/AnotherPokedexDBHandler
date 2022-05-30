const express = require('express');
const routes = express();

const fs = require('fs/promises');
const path = require('path');


//req function for testing
routes.get('/hey', async(req, res) => {
    const nationalPokedex = await fs.readFile(path.resolve(__dirname, '.', 'database/database.json'), 'utf-8');
    const nationalPokedexJSON = JSON.parse(nationalPokedex);
    const hey = nationalPokedexJSON.kantoRegion[0];
    
    res.status(200).json({ hey})
});


module.exports = routes;