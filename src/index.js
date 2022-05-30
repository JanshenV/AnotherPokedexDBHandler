require('dotenv').config();
const app = require('./server');

//Seeders
const { runningMigrations } = require('./seeders/migrations');

async function seedersFirst() {
    try {
        await runningMigrations();

        app.listen(process.env.SERVER_PORT);
    } catch ({ message }) {
        return console.log({ message });
    };
};

seedersFirst();

