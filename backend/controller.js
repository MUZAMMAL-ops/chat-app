const express = require('express');
const App = express();
const bcrypt = require('bcrypt');
const Token = require('jsonwebtoken');
const db = require('./dbconnection')
SECRET_KEY = 'iuyv6hgf67877bj?i';



//user registration
const Register = (req,res)=> {
    saltRounds = 10
    const {Email,Password} = req.body;
    console.log(Password);
    const query1 = `select Email from users where Email='${Email}'`
    db.query(query1)
    .then((data)=>{
        console.log(data);
        if(data[0].length>0){
            res.send('user already exist')
        }else{
           const payload = {
               Email:  `'${Email}'`,
            //    Password:`'${Password}'`,
            }
            
            let Token1 = Token.sign(payload,SECRET_KEY)
        bcrypt.genSalt(saltRounds,function(err,salt){
            bcrypt.hash(Password,salt,function(err,hash){
                
                let currentDate = new Date();
                let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
                const query2 =  `insert into users(Email,password) values('${Email}','${hash}')`
         db.query(query2)
        .then((result) => {
        return res.send({'Token':Token1}).status(201)
            
        }).catch((err) => {
            return res.send(err)        
                });
            })
            
        })
        }

    })
    .catch((err)=>{
        res.send(err)
    })
    
        }
    

   
//user login

const islogged = (req, res) => {
    const { Email, Password } = req.body;
    console.log('pass',Password);
    const payload1 = {
        Email:`'${Email}'`,

    }
    TOKEN2 = Token.sign(payload1,SECRET_KEY)

    const query = `select * from users where Email='${Email}'`;
    db.query(query)
    .then((result1)=>{
        console.log(result1)
        if(result1[0][0]==null){
             res.send('Please register yourself').status(401)
        }else{
            bcrypt.compare(Password,result1[0][0].password,function(err,result){
                if(result==true){
                    res.send({'Token':TOKEN2})
                }else if(err){
                    res.send('please provide correct password')
                }else{
                    res.send('some error occurs')
                }
            })
        }
        

    })
    .catch((Error)=>{
        res.send('some error occured')
    })


} 
module.exports = {
     Register,
     islogged
}
