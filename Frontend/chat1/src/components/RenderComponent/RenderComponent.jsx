import React, { useContext, useState } from 'react'
import './RenderComponent.css'
import { AddContact } from '../AddContact';

const RenderComponent = () => {
  const cont = {
    contact:''
  }
    const [contacstate,setcontactstate] = useState(cont);
    const [Addcontext,setAddcontext] = useContext(AddContact)
    console.log('con',contacstate);
    const AddtoContact = (e) => {
        setcontactstate({...contacstate,[e.target.name]: e.target.value });
    }
    const Addtolist = () =>{
        if (contacstate) {
            setAddcontext([...Addcontext,contacstate])

        }
    }
  return (
    <>
      <input type="Email" value={contacstate.contact} onChange={AddtoContact} name='contact' className='RenderComponent' required placeholder='Contact Email' onkeypress="return event.charCode != 32"/>
      <button type="button" onClick={Addtolist} >Add</button>
    </>
  )
}

export default RenderComponent