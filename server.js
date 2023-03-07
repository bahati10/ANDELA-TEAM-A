require('dotenv').config();
const session = require('express-session');
const express = require('express');
const passport = require('passport');
const db = require('./app/models');
require('./auth');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: process.env.SECRET_KEY }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

require('./app/routes/user.routes')(app);

// Google Authentication
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  res.redirect('/protected');
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.names}`);
});

// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye');
// });

app.get('/auth/failure', (req, res) => {
  res.send('Something went wrong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
