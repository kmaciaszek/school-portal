'use strict';

var express = require('express');
var User = require('./dao/UserDAO');
var Role = require('./dao/RoleDAO');
var passport = require('passport');

// API Router
// handles API requests
var apiRouter = express.Router();
//apiRouter.route('/auth/login').post(authorization.httpAuthorizeSubscriber.bind(authorization));

apiRouter.route('/role/all').post(ensureAuthenticated(request, response, function(request, response) {
    Role.findAll(function(err, data) {
        handleDAOResponse(request, response, err, data);
    });
}));

apiRouter.route('/user/all').post(ensureAuthenticated(request, response, function(request, response) {
    console.log(request.user);
    User.findAll(function(err, data) {
        handleDAOResponse(request, response, err, data);
    });
}));

apiRouter.route('/user/save').post(ensureAuthenticated(request, response, function(request, response) {
    User.insertUser(request.body, function(err, data) {
        handleDAOResponse(request, response, err, data);
    });
}));


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

apiRouter.route('/logout').post(function(req, res){
    req.logout();
    res.redirect('/');
});


function handleDAOResponse(request, response, err, data) {
    if (err || !data) {
        console.log(err);
        response.status(500);
        response.send(err);
        response.end();
    } else {
        response.status(200);
        response.send(data);
    }
}

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401);
    res.end();
}

module.exports = apiRouter;