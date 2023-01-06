require('dotenv').config({path: './config.env'});

const express = require('express');
const app = express()

const port = process.env.PORT || 4000

const db = require("./conn.js")

const router = require('./routes')

db.connetToServer(function(err){
    if(err){
        console.error(err)
        process.exit()
    }
    app.listen(port, () =>{
        console.log(`app running on port: ${port}`)
    })
})

app.use('/', router)