var mysql = require('mysql');
var settings = require('./serverSettings.js');

var connection;

getConnection();

function getConnection() {
    if (connection) {
        return connection;
    } else {
        connection = mysql.createConnection({
            host: settings.db.hostname,
            user: settings.db.username,
            password: settings.db.password,
            database: settings.db.databaseName,
            useTransaction: {
                connectionLimit: 1
            },
            useCursor: {
                connectionLimit: 1
            }
        });

        connection.connect(function (err) {
            if (!err) {
                console.log("Database is connected ... \n\n");
            } else {
                console.log("Error connecting database ... \n\n");
            }
        });
    }
}

module.exports.connection = connection;