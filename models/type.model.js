const sql = require('./db')

class Type {
    //Class constructor
    constructor(types) {
        this.name = types.name
    }

    //Retrieve all Pet Types from the Database
    static getAll(result) {
        sql.query('SELECT * FROM types', (err, res) => {
            if (err) {
                result(null, err)
                return
            }
            result(null, res)
        })
    }
}

module.exports = Type
