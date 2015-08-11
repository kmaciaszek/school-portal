var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./dao/UserDAO');

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

module.exports = passport;