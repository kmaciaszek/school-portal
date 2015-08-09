var db = require('./../database.js').connection;

function findAll(callback) {
    db.query('SELECT * from user', function (err, rows, fields) {
        if (!err) {
            console.log('Users: ', rows);

            callback(err, doSOmethingWithUsers(rows));
        } else {
            console.log('Error while performing Query.');
            callback(err, null);
        }
    });
}

function findByEmail(email, callback) {
    db.query('SELECT * from user where email = ?', [email], function (err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                callback(err, rows[0]);
            } else {
                callback(err, null);
            }
        } else {
            callback(err, null);
        }
    });
}

module.exports = {
    findByEmail: findByEmail,
    findAll: findAll
}