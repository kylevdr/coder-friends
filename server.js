const express = require('express'),
session = require('express-session'),
secrets = require('./secrets'),
GitHubApi = require('github'),
passport = require('passport'),
GitHubStrategy = require('passport-github2');

const app = express();

app.use(express.static('public'));

app.use(session({
  secret: secrets.sessionSecret,
  saveUninitialized: false,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

var github = new GitHubApi({
    debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "coder-friends"
    },
    Promise: require('bluebird'),
    followRedirects: false,
    timeout: 5000
});

passport.use(new GitHubStrategy({
  clientID: secrets.clientID,
  clientSecret: secrets.clientSecret,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github'), (req, res) => {
    res.status(200).redirect('/#/home');
  });

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}

function getUserFriends(req, res, next) {
  github.users.getFollowingForUser({
        username: req.user.username
    }, function(error, response) {
          res.status(200).send(response);
    });
}

app.get('/api/github/following', requireAuth, getUserFriends);

function getUserActivity(req, res, next) {
  github.activity.getEventsForUser({
        username: req.params.username
    }, function(error, response) {
          res.status(200).send(response);
    });
}

app.get('/api/github/:username/activity', requireAuth, getUserActivity);
