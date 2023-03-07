const dotenv = require('dotenv');
dotenv.config();

const path = require("path");
const express = require('express')
const app = express();

const sendEmail = require('./utilities/sendemail')

app.use(express.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render("contact")
})


app.post('/sendemail', (req, res) => {
    const {recipient, sub, email} = req.body;
    const from = "bahatiyves10@gmail.com";
    const to = "bahatiyves100@gmail.com";
    const subject = "Hello there from team A";

    const output = `
    <h3>New email request</h3>
    <ul>
      <li>recipent:  ${recipient}</li>
      <li>Subject:  ${sub}</li>
      <li>Email:  ${email}</li>`

    sendEmail(to, from, subject, output)
})


const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server is listening on port", port));
