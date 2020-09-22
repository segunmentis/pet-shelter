const Pt = require('../models/type.model')

//Retrieve all Pet Types
exports.showAll = (req, res) => {
    Pt.getAll((err, data) => {
        if (err)
            res.status(500).send({
                data: null,
                error:
                    err.message || 'Some error occurred while retrieving data.',
            })
        res.send({ data: data })
    })
}
