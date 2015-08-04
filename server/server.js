'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');

var User;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) throw err;
    User = db.collection('User');
    User.find({username: 'bob'}).toArray(function(err, docs) {
        console.log("---------------------");
        console.log(docs);
        console.log("---------------------");
    });

});

/*
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to DB');
    getUsers();
});
var Schema = mongoose.Schema;
// User Schema
var userSchema = new Schema({
    username: String,
    email: String,
    password: String
});
*/
/*
// Bcrypt middleware
userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    //bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    //    if(err) return cb(err);
    //    cb(null, isMatch);
    //});
    if (candidatePassword === this.password) {
        cb(null, true);
    } else {
        cb("password does not match");
    }
};
 */
// Seed a user
//var User = mongoose.model('User', userSchema);
//var User = mongoose.model('User');
/*
var usr = new User();
usr.username = 'bob';
usr.email = 'bob@example.com';
usr.password = 'secret';
console.log("before save");
usr.save(function(err) {
    console.log("saving...");
    if(err) {
        console.log(err);
    } else {
        console.log('user: ' + usr.username + " saved.");
    }
});
console.log("after save");
*/
/*
function getUsers() {
    User.findOne({username: 'bob'}, function (err, user) {
        console.log("user: " + user);
        console.log(err);
    });

    User.find({}, function(err, docs) {
        console.log(docs);
    });


}
*/

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//
//   Both serializer and deserializer edited for Remember Me functionality
passport.serializeUser(function(user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(email, done) {
    User.findOne( { email: email } , function (err, user) {
        done(err, user);
    });
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(function(username, password, done) {
    console.log("passport.use, username =  " + username + ", password = " + password);
    User.findOne({ username: username }, function(err, user) {
        console.log("find one: " + user);
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password === password) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Invalid password'});
        }
    });
}));


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/api/login')
}

var app = express();
var port = process.env.PORT || 3000;

app.set('port', port);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('views', path.join(__dirname, '../dist'));

app.use(express.static(path.join(__dirname, '../app')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ resave: true,
    saveUninitialized: true,
    secret: 'uwotm8' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator([]));

//app.use(favicon(path.join(__dirname, '../dist/favicon.ico')));


// API Router
// handles API requests
var apiRouter = express.Router();
//apiRouter.route('/auth/login').post(authorization.httpAuthorizeSubscriber.bind(authorization));
apiRouter.route('/hello').get(function(request, response) {
    response.status(200);
    response.write("Hello");
    response.end();
});
apiRouter.route('/login').post(function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            req.session.messages =  [info.message];
            return res.redirect('/api/login')
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
});

apiRouter.route('/logout').get(function(req, res){
    req.logout();
    res.redirect('/');
});


app.use('/api', apiRouter);

// static content Router
// This must be below the rendering handlers to avoid simple, static rendering of those



// catch 404 and forward to the error handlers below
app.use(function (req, res, next) {
    //log.error({url: req.url}, '404: Page not found');
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler. Will print stack trace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        //log.error({err: err, url: req.url}, 'Express error');
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler. No stack traces are leaked to the client.
app.use(function (err, req, res) {
    //log.error({err: err}, 'Express error');
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Starts the server.
app.startListening = function () {
    app.listen(port, function () {
        //log.info({port: port}, 'Express server listening for HTTP requests');
    });
};

// This module does not start the HTTP server automatically! That must be done from a calling module using
// app.startListening([optionalListener])
module.exports = app;
