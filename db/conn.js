const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let dbConn;

module.exports = {
    connetToServer: async function(callback){
        try{
            console.log("connecting")
            client.connect()
            dbConn = client.db("freecreate")
            const collection = dbConn.collection("users")
            console.log("connected")
            const users = await collection.find({}).limit(10).toArray()
            console.log(users)
            callback()
        }catch (err){
            callback(err)
        }
    },
    getDbConn: function(){
        return dbConn;
    }
}