
const sql = require("./db");

class Pet {
    //Class constructor
    constructor(pet) {
        this.name = pet.name;
        this.type = pet.type;
        this.breed = pet.breed;
        this.location = pet.location;
        this.latitude = pet.latitude;
        this.longitude = pet.longitude;
    }
    
    //Retrieve all pet data from databse
    static getAll(result) {
        sql.query("SELECT * FROM pets", (err, res) => {
            if(err){
                result(null, err);
                return;
            }
            result(null, res);
        });
    }

    //Retrieve single pet data using Id
    static findPet(petId, result) {
        sql.query(`SELECT * FROM pets WHERE id = ${petId}`, (err, res) => {
            if(err){
                result(null, err);
                return;
            }

            result(null,res)
                
        });
    }
}


module.exports = Pet;

