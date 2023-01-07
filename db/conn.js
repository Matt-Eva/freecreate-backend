const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let dbConn;

module.exports = {
    connetToServer: async function(callback){
        try{
            client.connect()
            dbConn = client.db("sample_airbnb")

            callback()
        }catch (err){
            callback(err)
        }
    },
    getDbConn: function(){
        return dbConn;
    }
}