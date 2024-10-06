"use client"
import React, { useState } from 'react'

const InputBox = () => {
    const [inputValue,setInputValue] = useState("")
  return (
    <div className='p-2'><input type='text' value={inputValue} 
    onChange={(e)=>{
        setInputValue(e.target.value)
    }}

    className='rounded-sm'></input></div>
  )
}

export default InputBox