import React from 'react'
import ChatPanel from './Chat/ChatPanel';
import InputMessage from './BottomPanel/InputMessage';
import SIdePanel from './Chat/SIdePanel';

function MainLayout() {
    return (
        <div className='--dark-theme' id='chat'>
            <div className='chat_box' >
                < ChatPanel />
            </div>
            <div className='chat_panel'>
                <InputMessage />
            </div>
            <div className='side_panel'>
                < SIdePanel />
            </div>
        </div>
    )
}

export default MainLayout;