//Include node dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//Define port
let port = process.env.PORT || 3000

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

require('./routes/pet.routes')(app)
require('./routes/type.routes')(app)
require('./routes/breed.routes')(app)

app.listen(port)

module.exports = app
