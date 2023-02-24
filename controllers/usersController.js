const db = require('../db/conn.js')
const bcrypt = require('bcrypt')

exports.login = async function (req, res){

    if(req.body.username === '' || req.body.password === ''){
        return res.status(404).send({error: "You must enter both a valid username and a valid password."})
    }

    const dbConn = db.getUserDb()
    const user = await dbConn.collection('users').findOne({username: req.body.username})

    if (!user){
        return res.status(404).send({error: "Please enter a valid username."})
    }

    bcrypt.compare(req.body.password, user.password, async function(err, result){
        if (!err){
            if (result) {
                req.session.user = {
                    username: user.username,
                    nickname: user.nickname,
                    thumbnail: user.thumbnail,
                    id: user._id
                }
                return res.status(200).send(req.session.user).end(req.session.id)
            } else {
                return res.status(401).send({error: "Please enter a valid password."})
            }
        } else {
            console.error("hash error", err)
            return res.status(422).send({error: "Could not process you request."})
        }
    })
}

exports.me = function (req, res){
    if (req.session.user) {
        return res.status(200).send(req.session.user)
    } else {
       return res.status(401).send({message:"Unauthorized"})
    }
}

exports.logout = function (req, res){
    req.session.destroy(function(err){
        if(err){
           return res.status(500).send({error: err})
        }else {
           return res.send({message: "Logged out"})
        }
    })
}

exports.create = async function(req, res){
    const dbConn = db.getUserDb()
    const data = req.body
    bcrypt.hash(data.password, 10, async function (err, hash){
        if(!err){
            try {
                const userData = {
                    username: data.username,
                    password: hash,
                    nickname: data.nickname,
                    thumbnail: data.thumbnail,
                }
                const newUser = await dbConn.collection('users').insertOne(userData)
                req.session.user = {
                    username: data.username,
                    nickname: data.nickname,
                    thumbnail: data.thumbnail,
                    id: newUser.insertedId
                }
               return res.status(201).send(req.session.user).end(req.session.id)
            } catch (error) {
                return res.status(422).send({error: error})
            }
        } else{
            return res.status(422).send({error: "Could not process your request."})
        }

    })
}