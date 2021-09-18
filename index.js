const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    bodyParser.json({
      limit: "5mb",
    })
);

require('./connection.js')
app.use(require('./routing/auth'))
app.get('/',(req,res)=>{
    res.send('Backend is Running');
})

app.listen(5000,()=>{
    console.log('Listening to the PORT');
})