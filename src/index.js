const Sequelize = require('sequelize')
const dbconfig = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const routes = require('./routes.js')

const Medico = require('./models/Medico')
const Especialidade = require('./models/Especialidade')

const connection = new Sequelize(dbconfig)

Medico.init(connection)
Especialidade.init(connection)

Medico.associate(connection.models)
Especialidade.associate(connection.models);


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(routes)

app.listen(process.env.PORT || 4444)

module.exports = connection;
