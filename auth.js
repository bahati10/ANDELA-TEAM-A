const db = require('./app/models');
const User = db.users;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ where: { email: profile.email } })
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          const newUser = {
            names: profile.displayName,
            email: profile.email,
          };
          User.create(newUser)
            .then(createdUser => {
              return done(null, createdUser);
            })
            .catch(err => {
              return done(err, null);
            });
        }
      })
      .catch(err => {
        return done(err, null);
      });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then(user => {
      if (!user) {
        return done("User not found", null);
      }
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});


