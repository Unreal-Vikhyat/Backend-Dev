const mongoose = require('mongoose');
const config = require('../config/' + process.env.NODE_ENV);

module.exports = async function () {
    try {
        await mongoose.connect(config.DB_URL, {
            maxPoolSize: 50
        });
        console.log("DB connected");
    } catch (err) {
        console.error("DB connection error", err);
        process.exit(1);
    }
};
