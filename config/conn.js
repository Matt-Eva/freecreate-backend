const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let connection;

module.exports = {
    connectToServer: async function(callback){
        try{
            console.log("connecting")
            connection = await client.connect()
            console.log("connected")
            callback()
        }catch (err){
            callback(err)
        }
    },
    getUserDb: function(){
        return connection.db('users');
    },
    getCreatorDb: function(){
        return connection.db('creators')
    },
    getStoryDb: function(){
        return connection.db('short_stories')
    }
}