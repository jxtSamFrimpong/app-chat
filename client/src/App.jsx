import React from 'react'
import { useEffect } from 'react'
import MainLayout from './components/MainLayout'
import { socketServer } from './socket/socketClient'

function App() {
  useEffect(() => {
    socketServer()
  }, [])


  return (
    <div>
      <MainLayout />
    </div>
  )
}

export default App