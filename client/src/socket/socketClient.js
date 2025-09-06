import { io } from 'socket.io-client'
import { store } from '../store/index'
import { storeResponse, aiError } from '../store/chatSlice'

let socket;

export const socketServer = () => {
    socket = io('http://localhost:3020')

    socket.on('connect', () => {
        console.log(`connected to server ${socket.id}`)

        socket.on('ai-response', (data) => {
            console.log('ai response', data)
            store.dispatch(storeResponse(data))
        })

        socket.on('ai-error', (data) => {
            console.log('ai error', data)
            store.dispatch(aiError(data))
        })
    })
}

export const sendMessageToServer = ({ message, chatID }) => {
    // const chat = {
    //     message,
    //     chatID
    // }
    let state = store.getState()
    const chat = state.chat.chats.find(i => i.id === chatID)
    socket.emit('user-message', {
        ...chat
    })
}