module.exports = (app) => {
    const Pt = require('../controllers/type.controller')
    //Retrieve all pet types
    app.get('/types', Pt.showAll)
}
