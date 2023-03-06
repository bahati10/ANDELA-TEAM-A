const dotenv = require('dotenv');
dotenv.config();


const express = require("express");

const app = express();

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {

    console.log("Failed to sync db: " + err.message);
  });

//   db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


const bodyParser = require("body-parser");
const cors = require("cors");





var corsOptions = {
    origin: "http://localhost:8081"
  };



  app.use(cors(corsOptions));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  require("./app/routes/user.routes")(app);
  const port = process.env.PORT || 5000;
  app.listen(port, () => {

    console.log("Server is running on port", port);
  });  

  


  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome Home." });
  });
  