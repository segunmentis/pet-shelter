
module.exports = app => {
    const Pet = require("../controllers/pet.controller");

    //Retrieve all Pets
    app.get("/", Pet.showAll);

    app.get("/pet/:petId", Pet.getPet);
}