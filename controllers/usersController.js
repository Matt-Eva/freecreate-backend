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

exports.create = async function(req, res){
    console.log("creating user")
    const dbConn = db.getDbConn()
    const data = req.body
    try {
        
    } catch (error){
        res.status(422).send({error: "Could not process data"})
    }
}