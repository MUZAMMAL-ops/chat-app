const express = require('express');
const App = express();
const router = express.Router()
const bodyParser = require('body-parser');
const {Register,islogged} = require('./controller')

const parse = bodyParser.json()



router.post('/signup',parse,Register)
router.post('/login',parse,islogged)

module.exports = router;

