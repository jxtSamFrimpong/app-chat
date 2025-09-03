import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        currentChatID: null,
        chats: [],
        loading: false
    },
    reducers: {
        setCurrentChatID: (state, action) => {
            state.currentChatID = action.payload
        },
        storeMessage: (state, action) => {
            const { message, chatID } = action.payload

            const chat = state.chats.find(i => i.id === chatID)

            if (chat) {
                chat.messages.push(message)
            }
            else {
                state.chats.push({
                    id: chatID,
                    messages: [message]
                })
            }
            state.loading = true;
        },
        storeResponse: (state, action) => {
            const { chatID, role, content } = action.payload
            const chat = state.chats.find(i => i.id === chatID)
            if (chat) {
                chat.messages.push({
                    role,
                    content
                })
            }
            state.loading = false
        }
    }
})


export const { setCurrentChatID, storeMessage, storeResponse } = chatSlice.actions;
export default chatSlice.reducer;