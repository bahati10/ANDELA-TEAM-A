const db = require("./app/models");
const User = db.users;

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');

// Configure passport to use the Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback"
  },

  function(accessToken, refreshToken, profile, done) {
    // Check if the user already exists in the database
    User.findOne({ where: { email: profile.email } })
      .then(user => {
        // If the user already exists, return the user object
        if (user) {
          return done(null, user);
        }
        // If the user does not exist, create a new user object and save it to the database
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
      })
      .catch(err => {
        return done(err, null);
      });
  }));

// Serialize and deserialize user
passport.serializeUser(function(user,done){
    done(null, user)
})

passport.deserializeUser(function(user,done){
    done(null, user)
})
