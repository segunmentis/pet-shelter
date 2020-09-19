const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

const datas = require("./data.json");

app.get("/", (req, res) => {
    res.send(datas);
});

app.get("/pet/:id", (req, res) => {
    const pets = datas.find(p => p.id === parseInt(req.params.id));
    if(!pets) res.status(404).send("Data not found");
    res.send(pets);
});


app.listen(port);