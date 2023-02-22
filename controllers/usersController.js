const db = require('../db/conn.js')
const bcrypt = require('bcrypt')

exports.login = function (req, res){
    console.log('hit')
    req.session.username = "matt"
    console.log(req.session.id)
    res.send(req.session.id)
}

exports.authorize = function (req, res){
    console.log(req.session.id)
    if (req.session.username) {
        res.status(200).send({message:"Authorized"})
    } else {
        res.status(401).send({message:"Unauthorized"})
    }
}

exports.logout = function (req, res){
    console.log(req.session.id)
    req.session.destroy(function(err){
        if(err){
            res.status(500).send({error: err})
        }else {
            res.send({message: "Logged out"})
        }
    })
}

exports.create = async function(req, res){
    console.log("creating user")
    const dbConn = db.getUserDb()
    const data = req.body
    console.log(req.body)
        bcrypt.hash(data.password, 10, async function (err, hash){
            try {
                const userCredentials = {
                    username: data.username,
                    password: hash
                }
                await dbConn.collection('user_credentials').insertOne(userCredentials)
                const userData= {
                    username: data.username,
                    nickname: data.nickname,
                    thumbnail: data.thumbnail,
                }
                const newUser = await dbConn.collection('user_data').insertOne(userData)
                const user = await dbConn.collection('user_data').findOne({_id: newUser.insertedId})
                console.log("user", user)
                console.log("username", user.username)
                req.session.username = user.username
                console.log(req.session.username)
                res.status(201).send(user).end(req.session.username)
            } catch (error) {
                console.error(error)
                res.status(422).send({error: "Could not process data"})
            }
        })
}