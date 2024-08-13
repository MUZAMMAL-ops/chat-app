import React from 'react';
import './App.css';
import Message from './components/messageBox/message';
import { Messages01 } from './components/messageContext';
import Screen from './components/Screen/screen';
import Input from './components/inputBox/input';
import ParentBox from './components/ParentBox/ParentBox';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navmenu from './components/Navmenu/Navmenu';
import { Messages02 } from './components/AddContact';
import {useParams} from 'react-router-dom';
import { SocketMessage } from './components/socketcontext';
import { Emailcheck, Emailcontext1 } from './components/Emailcontext';



function Chat() {
  const {userid} = useParams();
  return (
    <div className='flexof'>
      <div className='span1'>
            <Navmenu/>
            </div>
<div>
      <Screen />
      <Message />   
      </div>

    </div>
  );
}
function App() {
  return (
    <>
    <Emailcheck>
    <SocketMessage>
    <Messages02>
     <Messages01>
    <Router>
      <Routes>
        <Route path=':userid' element={<Chat/>}/>
           <Route path='/chat' element={<Chat/>}/>
          {/* <Route path='/chat' element={Screen}/> */}
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/' element={<Login/>}/>

  </Routes>
  </Router>
  </Messages01>
  </Messages02>
  </SocketMessage>
  </Emailcheck>
    </>
  );
}

export default App;
