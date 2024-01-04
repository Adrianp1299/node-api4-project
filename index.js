require('dotenv').config()
const express = require('express')
const cors = require('cors')

const Array = [{id: 1, name: 'Jeff', password: 'Jeffs Password'}, {id: 2, name: 'Adrian', password: 'Adrians Password'}]

const server = express()

const PORT = process.env.PORT || 9000

server.use(express.json())
server.use(cors())

server.get('/api/users', (req, res) => {
    res.json(Array)
})

server.post('/api/register', (req, res, next) => {
    Array.insert({ name: req.name, password: req.password})
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(next)
})

server.post('/api/login', async (req, res, next) => {
    try {if (!req.name && !req.password) {
        res.status(500).json({
            message: 'name and password are required'
        })
    } else {
        res.json({
            message: `Welcome ${req.name}`
        })
    }
    } catch {
        next(err)
    }
})

server.use('*', (req, res) => {
    res.send(`<h1>Hello, there!</h1>`)
})

server.use((err, req, res, next ) => { //eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

console.log(process.env.PORT, process.env.NODE_ENV)
