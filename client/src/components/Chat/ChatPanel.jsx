import React from 'react'
import ChatBubble from './ChatBubble'
import { useSelector } from 'react-redux'

function ChatPanel() {
    const { currentChatID, chats, loading } = useSelector((state) => state.chat)

    const chat = chats.find(c => c.id === currentChatID)

    return (
        <>
            {
                chat?.messages.map((message, index) => (
                    <ChatBubble key={index} data={message} />
                ))
            }
            {
                loading && (<div className='loader'>loading ...</div>)
            }
        </>
    )
}

export default ChatPanel