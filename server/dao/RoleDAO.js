var db = require('./../database.js').connection;

function findAll(callback) {
    db.query('SELECT * from role', function (err, rows, fields) {
        if (!err) {
            console.log('Roles: ', rows);
            callback(err, rows);
        } else {
            console.log('Error while performing Query.');
            callback(err, null);
        }
    });
}

module.exports = {
    findAll: findAll
};
