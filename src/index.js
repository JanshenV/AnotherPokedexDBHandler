require('dotenv').config();
const app = require('./server');

//Seeders
const runningMigrations = require('./seeders/migrations');
const fetchingData = require('./seeders/fetchingData');

async function seedersFirst() {
    try {
        await runningMigrations();
        await fetchingData();
    } catch (error) {
        return console.log(error);
    };
};

seedersFirst();

app.listen(process.env.PORT || 80);

