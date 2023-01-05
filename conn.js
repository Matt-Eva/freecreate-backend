const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://MattEva:<password>@mern-test-cluster.nz2cn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let dbConn;

module.exports = {
    connetToServer: async function(callback){
        try{
            client.connect()
            db = client.db("sample_airbnb")

            callback()
        }catch (err){
            callback(err)
        }
    },
    getDb: function(){
        return dbConn;
    }
}