const express = require('express');
const routes = express();


routes.get('/hey', (req, res) => {
    res.status(200).json('hey')
})


module.exports = routes;