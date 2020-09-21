const sql = require('./db')

class Pet {
    //Class constructor
    constructor(pet) {
        this.name = pet.name
        this.type = pet.type
        this.breed = pet.breed
        this.location = pet.location
        this.latitude = pet.latitude
        this.longitude = pet.longitude
    }

    //Retrieve all pet data from databse
    static getAll(result) {
        sql.query('SELECT * FROM pets', (err, res) => {
            if (err) {
                result(null, err)
                return
            }
            result(null, res)
        })
    }

    //Retrieve Pets from the databse with limits
    static listPets(index, limit, result) {
        sql.query(
            'SELECT * FROM pets LIMIT ? OFFSET ?',
            [parseInt(limit), parseInt(index)],
            (err, res) => {
                if (err) {
                    result(null, err)
                    return
                }
                result(null, res)
            }
        )
    }

    //Retrieve single pet data using Id
    static findPet(petId, result) {
        sql.query('SELECT * FROM pets WHERE id = ?', petId, (err, res) => {
            if (err) {
                result(null, err)
                return
            }

            result(null, res)
        })
    }

    //create a new Pet
    static create(newPet, result) {
        sql.query('INSERT INTO pets SET ?', newPet, (err, res) => {
            if (err) {
                result(null, err)
                return
            }

            result(null, { id: res.insertId, ...newPet })
        })
    }

    //Update Pet using Id
    static updatePet(petId, newPet, result) {
        sql.query(
            'UPDATE pets SET ? WHERE id = ?',
            [newPet, petId],
            (err, res) => {
                if (err) {
                    result(null, err)
                    return
                }

                if (res.affectedRows == 0) {
                    // Pet with id not found
                    result({ kind: 'not_found' }, null)
                    return
                }

                result(null, { id: petId, ...newPet })
            }
        )
    }

    //Delete Pet using Id
    static remove(petId, result) {
        sql.query('DELETE FROM pets WHERE id = ?', petId, (err, res) => {
            if (err) {
                result(null, err)
                return
            }

            if (res.affectedRows == 0) {
                //Pet with Id not found
                result({ kind: 'not_found' }, null)
                return
            }

            result(null, res)
        })
    }

    //Verify if name is unique
    static isNameInUse(name) {
        return new Promise((resolve, reject) => {
            sql.query(
                'SELECT COUNT(*) AS total FROM pets WHERE name = ?',
                name,
                (err, result) => {
                    if (!err) {
                        return resolve(result[0].total > 0)
                    } else {
                        return reject(new Error('Database error!!'))
                    }
                }
            )
        })
    }

    //Verify is breed is Unique
    static isBreedInUse(breed) {
        return new Promise((resolve, reject) => {
            sql.query(
                'SELECT COUNT(*) AS total FROM pets WHERE breed = ?',
                breed,
                (err, result) => {
                    if (!err) {
                        return resolve(result[0].total > 0)
                    } else {
                        return reject(new Error('Database error!!'))
                    }
                }
            )
        })
    }
}

module.exports = Pet
