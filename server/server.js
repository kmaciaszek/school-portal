'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var User = require('./dao/UserDAO');

/*
var user = {
    first_name: 'Iwona',
    last_name: 'Maciaszek',
    email: 'iwona.klysz@gmail.com',
    password: require('crypto-js').SHA256('secret').toString()
};

User.insertUser(user, function(err, user) {
   if (!err) {
       console.log(user);
   } else {
       console.log(err);
   }
});
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
    User.findByEmail(email, function (err, user) {
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
    User.findByEmail(username, function(err, user) {
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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ resave: true,
    saveUninitialized: true,
    secret: 'u7y6t5fg' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator([]));
app.use('/app', express.static('app'));
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

apiRouter.route('/subjects').get(function(request, response) {
    getSubjects(function (err, subjectList) {
        if (err || !subjectList) {
            response.status(500);
            response.end();
        } else {
            response.status(200);
            response.send(subjectList);
        }
    });
});

apiRouter.route('/login').post(function(req, res, next) {
    console.log('login...');
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            console.log('user not found');
            req.session.messages =  [info.message];
            res.status(401);
            res.end();
            return;
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.status(200);
            res.send(user);
            return;
        });
    })(req, res, next);
});

apiRouter.route('/logout').get(function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/api', apiRouter);

// Starts the server.
app.startListening = function () {
    app.listen(port, function () {
        //log.info({port: port}, 'Express server listening for HTTP requests');
    });
};

// This module does not start the HTTP server automatically! That must be done from a calling module using
// app.startListening([optionalListener])
module.exports = app;