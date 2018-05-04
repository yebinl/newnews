const mongoose = require('mongoose');

module.exports.connect = (url) => {
    mongoose.connect(url);
    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
    require('./user');
};
