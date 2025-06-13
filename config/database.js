const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = async () => {
    mongoose.connect(process.env.DATABASE_URL,)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err))
}

module.exports = dbConnection;

