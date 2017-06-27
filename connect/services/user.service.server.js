var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/connect/users', isAdmin, findUser);
app.get('/api/connect/user', findUserBy);
app.get('/api/connect/user/:userId', findUserById);
app.post('/api/connect/user', createUser);
app.put('/api/connect/user/:userId', updateUser);
app.delete('/api/connect/user/:userId', isAdmin, deleteUser);
app.delete('/api/connect/unregister', unregister);
app.get('/api/connect/user/:userId/:taskId', addTaskToContractor);
app.get('/api/connect/user/find', findAllTasksForUser);
app.get('/api/make', makeAdmin)

app.post('/api/connect/login', passport.authenticate('local'), login);
app.get('/api/connect/checkLoggedIn', checkLoggedIn);
app.get('/api/connect/checkAdmin', checkAdmin);
app.get('/api/connect/checkContractor', checkContractor);
app.post('/api/connect/register', register);
app.post('/api/connect/logout', logout);

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/connect/index.html#!/profile',
        failureRedirect: '/connect/index.html#!/login'
    }));

var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'name']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/connect/index.html#!/profile',
        failureRedirect: '/connect/index.html#!/login'
    }));


function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function addTaskToContractor(req, res) {
    userId = req.params['userId'];
    taskId = req.params['taskId'];
    userModel
        .addTaskToContractor(userId, taskId)
        .then(function () {
            res.sendStatus(200);
        })
}

function makeAdmin(req, res) {
    userModel
        .makeAdmin(req.user._id);
}

function findAllTasksForUser(req, res) {
    userId = req.user._id;
    userModel
        .findAllTasksForUser(userId)
        .then(function (tasks) {
            res.json(tasks);
        })
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        facebook: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}


function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user)
    }
    else {
        res.send('0');
    }
}

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function () {
                res.json(user);
            })
        })
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        })
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId'];
    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.json(user)
        });
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });

}

function findUser(req, res) {
    if (req.query['username'] && req.query['password']) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user !== null) {
                    res.json(user);
                }
                else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            })
    }

}


function findUserBy(req, res) {
    if (req.query['username']) {
        var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user)
            })
    }
    else if(req.query['email']) {
        var email = req.query['email'];
        userModel
            .findUserByEmail(email)
            .then(function (user) {
                res.json(user)
            })
    }
    else {
        res.sendStatus(404);
    }
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}

function checkAdmin(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user)
    }
    else {
        res.send('0')
    }
}

function checkContractor(req, res) {
    if (req.isAuthenticated() && req.user.roles.indexOf('CONTRACTOR') > -1) {
        res.json(req.user)
    }
    else {
        res.send('0')
    }
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}



