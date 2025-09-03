const express = require('express')
const http = require('http')
require('dotenv').config()
const cors = require('cors')
const { registerSocketServer } = require('./socket/socketServer')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send({
        response: 'ok'
    })
})

const server = http.createServer(app)
registerSocketServer(server)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
})