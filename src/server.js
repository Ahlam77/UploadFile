const express = require('express')
const route = require('./route')
const path = require('path')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const server = express()

server.set('view engine', 'ejs')

server.use(express.static('public'))

server.use(fileUpload())

server.use(express.json())

server.set('views', path.join(__dirname, 'views'))

//Middleware, decodifica il req e passa al controller
server.use(express.urlencoded({ extended: true }))

server.use(route)

 server.listen(8080, () => console.log('Server running on port 8080!let us go go gooooo 😍'))
