const express = require('express')
const ControllerXml2Xlsx = require('./controllers/ControllerXml2Xlsx.js')

//const data = require('./data/data.json')

const route = express.Router()

route.get('/', (req, res) => res.render('index'))

route.get('/json', (req, res) => res.render('json'))

route.post('/convert', ControllerXml2Xlsx.convertFromXmlToXlsx)




module.exports = route 