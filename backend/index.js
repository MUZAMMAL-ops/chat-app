const {createServer} = require('http');
const {Server} = require('socket.io');
const express = require('express');
const cors = require('cors');
const { Socket } = require('dgram');
const { log } = require('console');
const db = require('./dbconnection');
const Token = require('jsonwebtoken');
const middleware = require('./middleware')
const approutes = require('./approutes')
SECRET_KEY = 'iuyv6hgf67877bj?i';

const App = express();
App.use(cors({origin:'http://localhost:3000'}));

const httpserver = createServer(App)
const io = new Server(httpserver,{
     cors:{
          origin:'http://localhost:3000',
          methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
          

          
     },
     allowEIO3: true

});
App.use(express.json());

// const soc = new Server({
//      cors: {
//        origin: "http://localhost:3000"
//      }
//    });

App.use(middleware)
App.use('/',approutes)



//retrieving messages of connected client from database
io.on('connection',(socket) => {
     //console.log(`A ${socket.id} connected`);
     //console.log(socket);
     const AuthToken = socket.handshake.headers.auth;
     const decoded = Token.verify(AuthToken,'iuyv6hgf67877bj?i')
     console.log(decoded);
     const messageQuery = ` select messages from contacts where reciepient_Email = ${decoded.Email}`;
     db.query(messageQuery)
     .then((data)=>{
          //console.log(data);
          const  recmessage = data;
        const neww =  recmessage[0].map(row=>row)
        if (data[0].length>0) {
            socket.emit('message',neww)

        }
     })
     .catch((err) =>{
        socket.emit('message','some error occur while fetching the messages',{status:'401'})
     })
     const connected_cliets = `insert into socket_conn(socket_id,connected_clients)values('${socket.id}',${decoded.Email})`
     db.query(connected_cliets)
     .then((result)=> {
      //console.log('clients are connected');
     })
     .catch((err)=> {
      console.log('error');
     })
     socket.on('message',(data) => {
      const AuthToken1 = socket.handshake.headers.auth;
      const {client,message} = data;
      console.log('data',client,message);
       //console.log('message',message,client); 
       const messageQuery2 = `insert into contacts(messages,reciepient_Email,sender)values('${message}','${client}',${decoded.Email})`
       db.query(messageQuery2)
       .then((result)=>{
            const retrieve_id = `SELECT connected_clients, MAX(socket_id) AS latest_socket_id
            FROM socket_conn
            WHERE connected_clients = '${client}'
            GROUP BY connected_clients`
            db.query(retrieve_id)
            .then((result)=>{
               
                    console.log(result[0][0].latest_socket_id);

                    const latest_id =  result[0][0].latest_socket_id
                    console.log('this id',latest_id);

               if (latest_id) {
                    socket.to(latest_id).emit('message',message)

               }
               if (socket.recovered) {
                    socket.to(latest_id).emit('message',message)

               }
                    
               
              

            })
       })

     })
    
})



io.on('disconnect' ,(socket)=>{
     console.log(`${socket.id} disconnected`);
})

httpserver.listen(4000)
//httpserver.listen(4000);
App.listen(5000)


