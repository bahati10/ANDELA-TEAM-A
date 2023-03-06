const sgMail = require("@sendgrid/mail")

const API_KEY = "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"

sgMail.setApiKey(API_KEY)

const message = {
    to:"a.kagame@yahoo.com",
    from: "kagame8732@gmail.com",
    subject: "Greetings",
    text: "Hello for testing",
    html: "<h2>Hello for testing</h2>"
}

sgMail.send(message).then((response)=> console.log("Email sent well")).catch((error)=> console.log(error.message))