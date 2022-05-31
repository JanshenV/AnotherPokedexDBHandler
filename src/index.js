require('dotenv').config();
const app = require('./server');

//Seeders
const runningMigrations = require('./seeders/migrations');
const fetchingData = require('./seeders/fetchingData');
const callVariations = require('./seeders/pokemonVariations');

async function seedersFirst() {
    try {
        await runningMigrations();
        await fetchingData();
        // await callVariations();
        app.listen(process.env.SERVER_PORT);
    } catch ({ message }) {
        return console.log({ message });
    };
};

seedersFirst();

