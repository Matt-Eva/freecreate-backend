const db = require('../db/conn.js')

exports.index = async function(req, res){
    const dbConn = db.getDbConn()
    try {
        console.log("fetching users")
        const users = await dbConn.collection('users').find({}).limit(50).toArray()
        res.status(200).json(users)
    } catch (error){
        console.error(error)
    }
}

exports.login = function (req, res){
    console.log('hit')
    req.session.userId = 1
    res.status(200).send('Logged In')
}

exports.authorize = function (req, res){
    console.log(req.session.userId)
    if (req.session.userId) {
        res.status(200).send("Authorized")
    } else {
        res.status(401).send("Unauthorized")
    }
}