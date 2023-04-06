import  { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from "dotenv"
dotenv.config({path: './config.env'});
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let connection;

const db = {
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

export default db;