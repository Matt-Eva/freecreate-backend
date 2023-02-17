require('dotenv').config({path: './config.env'});

const express = require('express');
const app = express();
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const db = require("./db/conn.js")
const router = require('./routes/routes')
const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))

app.use(cookieSession({
    name:'session',
    keys: 'test', 
    maxAge: 24 * 60 * 60 * 1000
}))

app.use(bodyParser.json())

db.connectToServer(function(err){
    if(err){
        console.error(err)
        process.exit()
    }
    app.listen(port, () =>{
        console.log(`app running on port: ${port}`)
    })
})

app.use('/', router)