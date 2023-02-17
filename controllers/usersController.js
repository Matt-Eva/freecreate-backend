const db = require('../db/conn.js')
const bcrypt = require('bcrypt')

exports.login = function (req, res){
    console.log('hit')
    req.session.userId = 1
    res.status(200).send({message: 'Logged In'})
}

exports.authorize = function (req, res){
    console.log(req.session.userId)
    if (req.session.userId) {
        res.status(200).send("Authorized")
    } else {
        res.status(401).send("Unauthorized")
    }
}

exports.logout = function (req, res){
    console.log(req.session.userId)
    req.session = null
}

exports.create = async function(req, res, next){
    console.log("creating user")
    const dbConn = db.getUserDb()
    const data = req.body
    console.log(req.body)
    try {
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
                res.status(201).send(user)
            } catch (error) {
                console.error(error)
                res.status(422).send({error: "Could not process data"})
            }
        })
    } catch (error){
        console.error(error)
        res.status(422).send({error: "Could not process data"})
    }
}