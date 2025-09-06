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
            //implement streaming here
            const { chatID, role, content } = action.payload
            const chat = state.chats.find(i => i.id === chatID)

            const lastMessage = chat?.messages.at(-1)



            if (chat) {
                if (lastMessage?.role === 'assistant') {
                    lastMessage.content = lastMessage.content + content
                }
                else {
                    chat.messages.push({
                        role,
                        content
                    })
                }
            }
            state.loading = false
        },
        removeChat: (state, action) => {
            console.log('removing chat...', action.payload)
            const chatID = action.payload
            state.chats = state.chats.filter(c => c.id !== chatID);
            if (state.currentChatID === chatID) {
                state.currentChatID = null;
            }
            console.log('chats after removal', state.chats)
        },
        aiError: (state, action) => {
            const { chatID, content, error } = action.payload
            const chat = state.chats.find(i => i.id === chatID)

            if (chat) {
                chat.messages.push({
                    role: 'assistant',
                    content: content + (error ? ` (Error: ${error})` : ''),
                    error: error || "N/A"
                })
            }
            state.loading = false
        }
    }
})


export const { setCurrentChatID, storeMessage, storeResponse, removeChat, aiError } = chatSlice.actions;
export default chatSlice.reducer;