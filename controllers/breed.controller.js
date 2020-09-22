const Breed = require('../models/breed.model')

exports.showByType = (req, res) => {
    Breed.getBreedByType(req.params.type, (err, data) => {
        if (err)
            res.status(500).send({
                data: null,
                error: err.message || 'an error 0ccurred while retrieving data',
            })
        if (data.length) {
            res.send({ data: data })
        } else {
            res.status(404).send({
                data: null,
                error: 'Breed data was not found',
            })
        }
    })
}
