// use walkthrough from here: https://www.mongodb.com/developer/products/mongodb/seed-database-with-fake-data/
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "example"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const {faker} = require('@faker-js/faker');
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
port = 4000
console.log("change")

let dbConn;

async function connectDb(){
    try{
        console.log("connecting")
        client.connect()
        console.log("connected")
        dbConn = client.db("users")
        console.log("connected to users")
        app.listen(port, () => {
            console.log(`app running on ${port}`)
        })
        // testBcrypt()
        seed(dbConn)
    } catch (error){
        console.error(error)
        process.exit()
    }
}
connectDb()

async function seed(dbConn){
    console.log("starting seeds")
    createUsers(dbConn)
}

function testBcrypt(){
    // const saltRounds = 10;
    const myHash = bcrypt.hash("poop", 10, function(err, hash){
        console.log(hash)
    })
    // console.log(myHash)
}

async function createUsers(dbConn){
    collection = dbConn.collection("user_credentials")
    await collection.deleteMany({})
    const saltRounds = 10;
    const usernameArray = ['matt', 'dinjin', 'james']
    const nicknameArray = ['nala', 'choco', 'squeeb']
    const passwordArray = ['poop', 'food','help']

    let i = 0
    while (i < 3){
        console.log(i)
        const username = usernameArray[i]
        bcrypt.hash(passwordArray[i], 10, async function (err, hash){
            const newUser = {
                username: username,
                password: hash
            }
            console.log(i)
            console.log("within bcrypt")
            try {
                const addedUser = await collection.insertOne(newUser)
                console.log("success", addedUser)
            } catch (error){
                console.error(error)
                process.exit()
            }
        })
        i++
    }

}