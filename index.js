const express = require('express')

const server = express()

server.use(express.json())

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


server.post('/users', (req, res) => {
    const { name } = req.body // Pega o nome de dentro do Body da requisição

    users.push(name) // Coloca o nome pego dentro do Array

    return res.json(users) // Mostra o array já com o usuário novo
})

server.put('/users/:index', (req, res) => {
    const { index } = req.params // Pega o index passado na requisição
    const { name } = req.body // Pega o nome no body da requisição

    users[index] = name

    return res.json(users)
})

server.delete('/users/:index', (req, res) => {
    const { index } = req.params // Pega o index passado na requisição

    users.splice(index, 1) // Encontra o index dentro do array e apaga uma posição

    // return res.json(users) // retorna lista de usuários após deletar
    return res.send() //Não retorna nenhum conteúdo após deletar
})

server.listen(3000)