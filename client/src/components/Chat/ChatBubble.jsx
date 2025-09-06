import React from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { RiRobot3Fill } from 'react-icons/ri'
import { MdErrorOutline } from 'react-icons/md'

function ChatBubble({ data }) {
    console.log(data)

    let aiError = data?.error ? true : false

    return (
        <div className={`chat_box_container ${data.role === 'user' ? 'user' : 'reversed'}`}>
            <div className='person' >
                <div className='person_avartar' >
                    {data.role === 'user' && < HiUserCircle color="white" />}
                    {data.role === 'assistant' && !aiError && < RiRobot3Fill color="white" />}
                    {data.role === 'assistant' && aiError && < MdErrorOutline color="red" />}
                </div>
            </div>
            <div className='chat_box_context' >
                <div className='chat_box_bubble' >
                    <span style={aiError ? { borderBlockColor: 'red' } : {}}>{data.content}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble