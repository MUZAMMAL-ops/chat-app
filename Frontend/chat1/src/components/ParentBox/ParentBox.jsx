import React, { useContext, useState } from 'react'
import { messageContext01 } from '../messageContext';
import Input from '../inputBox/input';
import { AddContact } from '../AddContact';
import Contact from '../contactlist/contact';
import { socketcontext } from '../socketcontext';

const ParentBox = () => {
    const [messageContext] = useContext(messageContext01);
    const[Addcontext,setAddcontext] = useContext(AddContact)
    const {socketstate} = useContext(socketcontext);
console.log('socketstate',socketstate);
    console.log('messageContext:', messageContext);


  return (
    <>
   {
    messageContext.map((messageContext,index=> (
        <Input key={index} value={index.messages}/>
    )))
   }
   
   {
    socketstate?
    socketstate.map((socketstate,index=>(
        <Input key={index} value={index.messages}/>
    )))
    :null
   }

    </>
  )
}

export default ParentBox