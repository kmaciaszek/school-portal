'use strict';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('./passportConfig.js');
var apiRouter = require('./router.js');

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

//app.use('/api/user/all', ensureAuthenticated);

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