const mongoose = require('mongoose');
const config = require('config');

const dbURL = config.DBHost;

//require chalk module to give colors to console text
var chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

connect = () => {

    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    mongoose.connection.on('connected', function () {
        console.log(connected("Mongoose default connection is open to ", dbURL));
    });

    mongoose.connection.on('error', function (err) {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });

};

connect();

module.exports = connect;

