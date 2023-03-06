require('dotenv').config();
const session = require('express-session')
const express = require("express");
const passport = require('passport')
const jwt = require('jsonwebtoken');
const cors = require("cors");
require('./auth')

const JWT_SECRET = process.env.JWT_SECRET;

function isLoggedIn(req, res, next) {
  console.log('req:', req);
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(401);
}



const app = express();
app.use(session({secret: process.env.SECRET_KEY}))
app.use(passport.initialize())
app.use(passport.session())

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

//USER ROUTES
require("./app/routes/user.routes")(app);

// GOOGLE AUTHENTICATION
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  if (req.user) {
    const token = jwt.sign({ userId: req.user.id }, JWT_SECRET);
    console.log('Token:', token);
    res.cookie('token', token);
    res.redirect('/protected');
  } else {
    res.redirect('/auth/failure');
  }
});


app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/auth/failure',(req,res)=>{
  res.send('Something went wrong')
})

app.get('/logout',(req,res)=>{
  req.logout();
  req.session.destroy();
  res.send('Goodbye')
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
