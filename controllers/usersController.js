const db = require('../db/conn.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = function (req, res){
    console.log('hit')
    req.session.userId = 1
    res.status(200).send({message: 'Logged In'})
}

exports.authorize = function (req, res){
    req.session.username = "hello"
    console.log("session", req.session.username)
    if (req.session.username) {
        res.status(200).send({message:"Authorized"})
    } else {
        res.status(401).send({message:"Unauthorized"})
    }
}

exports.logout = function (req, res){
    console.log(req.session.userId)
    req.session = null
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