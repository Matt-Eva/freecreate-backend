require('dotenv').config({path: './config.env'});

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 4000
const db = require("./db/conn.js")
const router = require('./routes/routes')
const path = require('path')
const cors = require('cors');
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
const session = require('express-session')
const MongoStore = require('connect-mongo')
const uri = process.env.ATLAS_URI
const store = MongoStore.create({
    mongoUrl: uri,
    dbName: 'sessions',
    collectionName: 'sessions',
})
const sess = {
    secret: 'test',
    store: store,
    resave: false,
    saveUninitialized: false
}

// if (app.get('env') === 'production'){
//     app.set('trust proxy', 1)
//     sess.cookie.secure = true
// }

app.use(session(sess))

app.use(cors(corsOptions))


app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/login', function(req, res){
    req.session.userID = 1
    console.log(req.session.id)
    res.send({user: "I'm a user"}).end(req.session.id);
})

app.get('/logout', function(req,res){
    console.log(req.session.id)
    console.log(req.session.userID)
    req.session.destroy(function(err){
        if(err){
            console.log(err)
        }else{
            res.send({message: `deleted ${req.session}` })
        }
    })
})

app.get("/me", (req, res) =>{
    if(req.session.userID){
        res.send({message: true})
    }else{
        res.send({message: false})
    }
})

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

// app.get('/me', (req, res) =>{

// })

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