//Include node dependencies
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Define port 
let port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/pet.routes")(app);

app.listen(port);