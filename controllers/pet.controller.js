const Pet = require("../models/pet.model");

//Retrieve all Pets
exports.showAll = (req, res) => {
    Pet.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving data."
          });
        res.send(data);
      });
}

//Retrieve Pet data using Id
exports.getPet = (req, res) => {
  Pet.findPet(req.params.petId, (err, data) => {
    if(err)
      res.status(500).send({
        message: err.message || "an error 0ccurred while retrieving data"
      });
     if(data.length){
      res.send(data[0]);
     }
     else{
       res.status(404).send({
         message: "Pet data was not found"
       })
     }
      
  })
}