import React from 'react'

const Message = ({_message}:{_message : {id:string,data:string}}) => {
  return (
    <div className='p-1 m-1'>{_message.data}</div>
  )
}

export default Message