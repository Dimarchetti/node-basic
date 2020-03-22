const express = require('express')

const server = express()

server.use(express.json())

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Dimitri", "Email": "dimitri.marchetti@gmail.com" }

// CRUD - Create, Read, Update, Delete

const users = ['Dimitri Marchetti', 'Felipe Pato Marchetti', 'Erika Pato']


// Middleware global, independente da rota acessada ele será chamado
server.use((req, res, next) => {
    console.time('Request')
    console.log(`Método: ${req.method}; URL: ${req.url}`)

    next()

    console.timeEnd('Request')
})

// Middleware de checagem se nome de usuário está sendo passado no body da requisiçã0
const checkUserExist = (req, res, next) => {
    if(!req.body.name) {
        return res.status(400).json({ error: 'User name is required!' })
    }

    return next()
}

// Middleware de checagem se o index de usuário existe dentro do array
const checkUserInArray = (req, res, next) => {
    const user = users[req.params.index]

    if(!user) {
        return res.status(400).json({ error: 'Index not found and user not exists!' })
    }

    req.user = user

    return next()
}


// lista de todos os usuários
server.get('/users', (req, res) => {
    return res.json(users)
})

// pega somente 1 usuário do array users
server.get('/user/:index', checkUserInArray, (req, res) => {
    //const { nome } = req.query // Pega as query params na url
    //const { id } = req.params // Pega o id passado na requisição
    // const { index } = req.params // Pega o id passado na requisição

    return res.json(req.user)
})


// cadastra 1 usuário
server.post('/users', checkUserExist, (req, res) => {
    const { name } = req.body // Pega o nome de dentro do Body da requisição

    users.push(name) // Coloca o nome pego dentro do Array

    return res.json(users) // Mostra o array já com o nome do usuário novo
})

// atualiza 1 usuário na lista users
server.put('/users/:index', checkUserExist, checkUserInArray, (req, res) => {
    const { index } = req.params // Pega o index passado na requisição
    const { name } = req.body // Pega o nome no body da requisição

    users[index] = name

    return res.json(users)
})

// deleta 1 usuário da lista users
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params // Pega o index passado na requisição

    users.splice(index, 1) // Encontra o index dentro do array e apaga uma posição

    // return res.json(users) // retorna lista de usuários após deletar
    return res.send() //Não retorna nenhum conteúdo após deletar
})

server.listen(3000)