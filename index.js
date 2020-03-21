const express = require('express')

const server = express()

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Dimitri", "Email": "dimitri.marchetti@gmail.com" }

// CRUD - Create, Read, Update, Delete

const users = ['Dimitri', 'Andréia', 'Luiz' ]

server.get('/users', (req, res) => {
    return res.json(users)
})

server.get('/user/:index', (req, res) => {
    //const { nome } = req.query // Pega as query params na url
    //const { id } = req.params // Pega o id passado na requisição
    const { index } = req.params // Pega o id passado na requisição

    return res.json(users[index])
})

server.listen(3000)