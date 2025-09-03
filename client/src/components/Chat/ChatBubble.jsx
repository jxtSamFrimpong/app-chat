import React from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { RiRobot3Fill } from 'react-icons/ri'

function ChatBubble({ data }) {
    console.log(data)

    return (
        <div className={`chat_box_container ${data.role === 'user' ? 'user' : 'reversed'}`}>
            <div className='person' >
                <div className='person_avartar' >
                    {
                        data.role == 'user' ?
                            < HiUserCircle color="white" /> :
                            < RiRobot3Fill color="white" />
                    }
                </div>
            </div>
            <div className='chat_box_context' >
                <div className='chat_box_bubble' >
                    <span>{data.content}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatBubble