import React, { useState } from 'react'
import './Navmenu.css'
import Message from '../messageBox/message'
import RenderComponent from '../RenderComponent/RenderComponent';
import ParentBox from '../ParentBox/ParentBox';
import Contactparent from '../contactParent/contactparent';

const Navmenu = () => {
    const [btnState,setbtnState] = useState();

    const render = ()=> {
        if (btnState==null) {
            setbtnState(true)
        }else{
            setbtnState(null)
        }
    }
  return (
    <> 
      <div className='menu'>
        <button onClick={render} type="button">create</button>
      </div>
      {
        btnState?<RenderComponent/>:null
      }
      <Contactparent/>
    </>
  )
}

export default Navmenu