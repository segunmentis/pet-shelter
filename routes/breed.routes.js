module.exports = (app) => {
    const Breed = require('../controllers/breed.controller')
    //Retrieve pet breeds with pet type
    app.get('/breeds/:type', Breed.showByType)
}
