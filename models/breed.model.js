const sql = require('./db')

class Breed {
    constructor(breed) {
        this.name = breed.name
        this.type = breed.type
    }

    static getBreedByType(type, result) {
        sql.query('SELECT * FROM breeds WHERE type = ?', type, (err, res) => {
            if (err) {
                result(null, err)
                return
            }

            result(null, res)
        })
    }
}

module.exports = Breed
