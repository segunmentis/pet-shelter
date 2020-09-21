module.exports = (app) => {
    const Pet = require('../controllers/pet.controller')

    //Retrieve all Pets
    app.get('/pets/:index/:limit', Pet.showAll)

    //Retrieve a pet using petId
    app.get('/pets/:petId', Pet.getPet)

    //Add a new Pet
    app.post('/pets/add', Pet.validate('add'), Pet.add)

    // Update a Customer with customerId
    app.put('/pets/:petId', Pet.validate('update'), Pet.update)

    // Delete a Pet using petId
    app.delete('/pets/:petId', Pet.delete)
}
