import React, { useContext } from 'react'
import './contact.css'
import {Link,useParams,useSearchParams} from 'react-router-dom';
import {use} from 'react-router-dom'
import { AddContact } from '../AddContact';
import { Emailcontext1 } from '../Emailcontext';
const Contact = ({value}) => {
  const [Addcontext] = useContext(AddContact);
  const [searchParams,setsearchParams] = useSearchParams();
  const [Emailstate,setEmailstate] = useContext(Emailcontext1)

  const setthisparam = (e) => {
    // setsearchParams(value)
    setEmailstate(value)
  }

  return (
    <>
    <button onClick={setthisparam}>
      <div className="contactlist1">
      {value}


      </div>
      </button>
    </>
  )
}

export default Contact