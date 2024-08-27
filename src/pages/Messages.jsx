import React from 'react'
import MessageRetrieve from '../components/MessageRetrieve'
import MessageInput from '../components/MessageInput'

function Messages() {
  return (
    <>
        <MessageRetrieve class="User" />
        <MessageInput class="User" />
    </>
  )
}

export default Messages