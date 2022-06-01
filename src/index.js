require('dotenv').config();
const app = require('./server');

//Seeders
const runningMigrations = require('./seeders/migrations');
const fetchingData = require('./seeders/fetchingData');

async function seedersFirst() {
    try {
        await runningMigrations();
        await fetchingData();
        app.listen(process.env.PORT || 3000);
    } catch ({ message }) {
        return console.log({ message });
    };
};

seedersFirst();

