'use strict';
module.exports = function (config) {
    const mongoose = require('mongoose');
    const url = 'mongodb://' + config.user + ':' + config.pwd + '@' + config.host + '/' + config.db;

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => { console.log("we are connected"); }).catch(err => console.log(err));
    mongoose.connection;

    //Get the default connection
    let db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}