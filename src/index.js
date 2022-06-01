require('dotenv').config();
const app = require('./server');

//Seeders
const runningMigrations = require('./seeders/migrations');
const fetchingData = require('./seeders/fetchingData');

async function seedersFirst() {
    try {
        await runningMigrations();
        await fetchingData();
<<<<<<< HEAD
        app.listen(process.env.PORT || 3000);
=======
        app.listen(process.env.SERVER_PORT || 2700);
>>>>>>> 19290c6f486b5bd0ea5cc01d4925c77909870c26
    } catch ({ message }) {
        return console.log({ message });
    };
};

seedersFirst();

