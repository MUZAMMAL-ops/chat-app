import React from 'react'
import './input.css'
import ChatIcon from '@mui/icons-material/Chat';
const Input = ({value}) => {
  return (
    <>
     <div className='main'>
     
     <div className='list'><ChatIcon/>{value}</div>

     </div>

    </>
  )
}

export default Input