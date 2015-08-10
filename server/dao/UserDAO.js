var db = require('./../database.js').connection;

function findAll(callback) {
    db.query('SELECT * from user', function (err, rows, fields) {
        if (!err) {
            console.log('Users: ', rows);
            callback(err, rows);
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

function findById(id, callback) {
    db.query('SELECT * from user where id = ?', [id], function (err, rows, fields) {
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

function insertUser(user, callback) {
    db.query('insert into user set ?', user, function(err, res) {
        if (!err) {
            if (res.insertId) {
                findById(res.insertId, function(err, user) {
                    if (!err) {
                        callback(err, user);
                    } else {
                        callback(err, null);
                    }
                });
            }
        } else {
            callback(err, null);
        }
    });
}

module.exports = {
    findByEmail: findByEmail,
    findAll: findAll,
    insertUser: insertUser
};