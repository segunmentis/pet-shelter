const Pet = require('../models/pet.model')
const { body, validationResult } = require('express-validator')

//Retrieve all Pets
exports.showAll = (req, res) => {
    Pet.listPets(req.params.index, req.params.limit, (err, data) => {
        if (err)
            res.status(500).send({
                data: null,
                error:
                    err.message || 'Some error occurred while retrieving data.',
            })
        res.send({ data: data })
    })
}

//Retrieve Pet data using Id
exports.getPet = (req, res) => {
    Pet.findPet(req.params.petId, (err, data) => {
        if (err)
            res.status(500).send({
                data: null,
                error: err.message || 'an error 0ccurred while retrieving data',
            })
        if (data.length) {
            res.send({ data: data[0] })
        } else {
            res.status(404).send({
                data: null,
                error: 'Pet data was not found',
            })
        }
    })
}

//Add Pet data
exports.add = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ data: null, error: errors.array() })
    }

    Pet.create(new Pet(req.body), (err, data) => {
        if (err) {
            res.status(500).send({
                data: null,
                error: err.message || 'An error occurred while adding data',
            })
        }

        res.send({
            data: data,
            message: 'Pet created',
        })
    })
}

//Update Pet using Id
exports.update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ data: null, error: errors.array() })
    }

    Pet.updatePet(req.params.petId, new Pet(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    data: null,
                    error: 'Pet not found',
                })
            } else {
                res.status(500).send({
                    data: null,
                    error: 'Error updating Pet',
                })
            }
        } else {
            res.send({
                data: data,
                message: 'Pet updated successfully',
            })
        }
    })
}

//Delete Pet using Id
exports.delete = (req, res) => {
    Pet.remove(req.params.petId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    data: null,
                    error: 'Pet not found',
                })
            } else {
                res.status(500).send({
                    data: null,
                    error: 'Could not delete Pet with id ' + req.params.petId,
                })
            }
        } else {
            res.send({
                data: null,
                message: 'Pet was successfully deleted',
            })
        }
    })
}

exports.validate = (method) => {
    switch (method) {
        case 'update':
            return [
                body('name', 'Name is required').notEmpty(),
                body('type', 'Pet type is required').notEmpty(),
                body('breed', 'Breed is required').notEmpty(),
                body('latitude', 'Latitude is required')
                    .notEmpty()
                    .isDecimal()
                    .withMessage('Latitude must be decimal'),
                body('longitude', 'Longitude is required')
                    .notEmpty()
                    .isDecimal()
                    .withMessage('Longitude must be decimal'),
            ]
        default:
            return [
                body('name', 'Name is required')
                    .notEmpty()
                    .custom(async (name) => {
                        const value = await Pet.isNameInUse(name)
                        if (value) {
                            throw new Error('Name already exists')
                        }
                    })
                    .withMessage('Name already exists'),
                body('type', 'Pet type is required').notEmpty(),
                body('breed', 'Breed is required')
                    .notEmpty()
                    .custom(async (breed) => {
                        const val = await Pet.isBreedInUse(breed)
                        if (val) {
                            throw new Error('Breed already exists')
                        }
                    })
                    .withMessage('Breed already exists'),
                body('latitude', 'Latitude is required')
                    .notEmpty()
                    .isDecimal()
                    .withMessage('Latitude must be decimal'),
                body('longitude', 'Longitude is required')
                    .notEmpty()
                    .isDecimal()
                    .withMessage('Longitude must be decimal'),
            ]
    }
}
