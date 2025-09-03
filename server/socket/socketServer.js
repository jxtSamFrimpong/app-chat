const { Server } = require('socket.io')
const { messageHandler } = require('./handlers')

const registerSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('connected to the socket', socket.id)

        socket.on('user-message', (data) => {
            messageHandler(socket, data)
        })
    })
}

module.exports = {
    registerSocketServer
}