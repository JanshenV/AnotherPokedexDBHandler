const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const compression = require('compression');

const app = express();

app.use(express.json());
app.use(compression())
app.use(cors());
app.use(routes);

module.exports = app;