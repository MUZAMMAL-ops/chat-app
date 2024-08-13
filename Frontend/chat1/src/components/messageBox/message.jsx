import React, { useState,useContext, useEffect } from 'react'
import './messaage.css'
import { messageContext01 } from '../messageContext'
import {Socket, io} from 'socket.io-client';
import { socketcontext } from '../socketcontext';
import {json, useLocation} from 'react-router-dom'

import { Emailcontext1 } from '../Emailcontext';

const Message = () => {
  const newData = ''
  const data = {
     Message:'',
  }
    const [messagestate,setmessagestate] = useState(data)
    const [messageContext,setmessageContext] = useContext(messageContext01)
    const {setsocketstate} = useContext(socketcontext)
    const [Emailstate,setEmailstate] = useContext(Emailcontext1);

    console.log('Emailstate',Emailstate);
    


    // console.log('hello',messagestate.Message);

    const messageValue = (e) => {
      // Update messageState with a new object containing previous state and new value
      setmessagestate({
        ...messagestate,
        [e.target.name]: e.target.value
      });
    };

    //console.log('mess',messageContext.Message);
    const messageArray = [];
     
    for(let obj of messageContext){
      messageArray.push(obj.Message)
    }
const lastindexedmessage = messageArray.pop()
    // let newMessage = messageArray.toString()
    // console.log('new',newMessage);

  const socket = io('http://localhost:4000',{
        autoConnect:true,
        extraHeaders:{
          auth:localStorage.getItem('Token')
        }  
      })
      socket.on('disconnect',(socket)=>{
        console.log(`${socket.id} disconnected`);
      })
  
      console.log('lastindexedmessage',lastindexedmessage)
      
       
      useEffect(() => {
      
        socket.on('message',(message)=> {
          console.log('socket message',message);
          setsocketstate(message)
        
          let data2 = {
            message:lastindexedmessage,
            client:Emailstate
          }
          
          
          if (Emailstate&&lastindexedmessage) {
            // socket.on('message',( socket.emit('message',(data2))))
            socket.emit('message',(data2))
      
      setEmailstate(null)
      
      
          }
  
        })
        return () => {
          socket.off('message');
        }
    
      }, [lastindexedmessage,socket])
      

      // socket.on('message',(message)=> {
      //   console.log('socket message',message);
      //   setsocketstate(message)
      
      //   let data2 = {
      //     message:lastindexedmessage,
      //     client:Emailstate
      //   }
        
        
      //   if (Emailstate&&lastindexedmessage) {
      //     // socket.on('message',( socket.emit('message',(data2))))
      //     socket.emit('message',(data2))
    
    
      //   }

      // })
  


    
      const sendMessage = (e) => {
        if (messagestate.Message&&Emailstate) {
          setmessageContext([...messageContext,messagestate])
          setmessagestate({Message:''})
        }
  
  }
  return (
    <>
     <div className='messageFlex'>
        <div>
            <input className='input' type="text" value={messagestate.Message} onChange={messageValue} name="Message" id="msg" />
        </div>
         <div className='btn'>
              <button className='btn81' onClick={sendMessage}  type="text">send</button>
         </div>
     </div>
    </>
  )
}

export default Message;

