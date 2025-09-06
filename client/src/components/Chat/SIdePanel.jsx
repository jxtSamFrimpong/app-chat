import React from 'react'
import { useState } from 'react'
import { IoCloseCircle, IoMenu } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { setCurrentChatID, removeChat } from '../../store/chatSlice'

function SIdePanel() {

    const [openNav, setOpenNav] = useState(false)
    const dispatch = useDispatch()
    const { chats, currentChatID } = useSelector((state) => state.chat)

    const handleNewChat = () => {
        const newChatID = uuid()
        dispatch(setCurrentChatID(newChatID))
    }

    const toggleNave = () => {
        setOpenNav(!openNav)
    }
    return (
        <>
            {
                chats.length > 0 && (
                    <>
                        <button className='openbtn' onClick={toggleNave}>
                            <IoMenu />
                        </button>
                        <div id='mySidePanel' className={`sidepanel ${openNav ? 'active' : ''}`}>
                            <span className='closebtn' onClick={toggleNave}>x</span>
                            <div>
                                <ul >
                                    {
                                        chats.map(c => (
                                            <li key={c.id}
                                                className={c.id === currentChatID ? 'active' : ''}
                                            >
                                                <span
                                                    onClick={() => {
                                                        dispatch(setCurrentChatID(c.id))
                                                    }}
                                                >{c.messages.length > 0 ?
                                                    c.messages[0].content : 'New Chat'}</span>
                                                <span className='deleteBtn' onClick={() => dispatch(removeChat(c.id))} >
                                                    <IoCloseCircle />
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {
                                chats.length > 0 && (
                                    <div className='new-chat-button' onClick={handleNewChat} >
                                        New Chat
                                    </div>
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default SIdePanel