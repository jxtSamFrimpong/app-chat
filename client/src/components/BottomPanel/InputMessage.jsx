import React from 'react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessageToServer } from '../../socket/socketClient'
import { setCurrentChatID, storeMessage } from '../../store/chatSlice'

function InputMessage() {
    const dispatch = useDispatch()
    const [content, setContent] = useState("")

    let chatID = useSelector((state) => state.chat.currentChatID)

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            console.log('enter pressed')
            sendMessage()
        }
    }

    const sendMessage = () => {
        console.log('sending message with', content)
        const message = {
            role: 'user',
            content: content.trim()
        }
        if (!chatID) {
            chatID = uuid()
            dispatch(setCurrentChatID(chatID))
        }
        dispatch(storeMessage({ chatID, message }))
        sendMessageToServer({ message, chatID })

        setContent('')
    }

    return (
        <div className='chat_box_panel'>
            <input
                type='text'
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
                onKeyDown={handleEnterPress}
                placeholder='Lets Chat'
                className='chat_box_input'
            />
        </div>
    )
}

export default InputMessage