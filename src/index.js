require('dotenv').config();
const app = require('./server');
const { handleRawPokedex } = require('./seeders');

handleRawPokedex();

app.listen(process.env.SERVER_PORT);