import React, { useContext, useState,useEffect } from 'react'
import { messageContext01 } from '../messageContext';
import Input from '../inputBox/input';
import { AddContact } from '../AddContact';
import Contact from '../contactlist/contact';
import { socket } from 'socket.io-client';

const Contactparent = () => {
    const [messageContext] = useContext(messageContext01);
    const [Addcontext] = useContext(AddContact)
    console.log('my',Addcontext.contact);

    console.log('messageContext:', messageContext);



  return (
    <>

   {
    Addcontext.map((contact, index) => (
        <Contact key={index} value={contact.contact} />
      ))

   }

    </>
  )
}

export default Contactparent