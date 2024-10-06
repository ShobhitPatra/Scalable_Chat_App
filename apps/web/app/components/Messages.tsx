import React from 'react'
import Message from './Message'

const Messages = () => {
  return (
    <div className='bg-slate-300 rounded-sm'>{dummyMessages.map((message)=> <Message key={message.id} _message={message}/>)}</div>
  )
}

export default Messages

const dummyMessages = [
    {
        id:"gdasfg",
        data  :"dfgjksgdfk"
    }
]