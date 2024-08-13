const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router()
const parse = bodyParser.json()
const appRoutes = require('./approutes')

router.use(bodyParser.urlencoded({ extended: true }));



//User Signup
router.use('/signup',parse,(req,res,next)=> {

    const {Email,Password} = req.body;
    console.log(Email);
    
    if(!Email,!Password){
        res.send('Please fill the required information').status(400)
    } else{
        next()
    }
})
 router.post('/signup',appRoutes)


//User login
router.use('/login',parse,(req,res,next)=> {
    const {Email,Password} = req.body;
    console.log(Email);
    if(!Email||!Password){
        res.send('Please provide your credentials').status(401)
    } else {
        
        next()
    }
})
router.post('/login',appRoutes)

module.exports = router;