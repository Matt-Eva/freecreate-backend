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