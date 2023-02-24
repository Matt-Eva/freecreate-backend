// use walkthrough from here: https://www.mongodb.com/developer/products/mongodb/seed-database-with-fake-data/
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "example"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const bcrypt = require('bcrypt')
port = 4000

async function connectDb(){
    try{
        console.log("connecting")
        const connection = await client.connect()
        console.log("connected")
        const dbConn = connection.db('users')
        await createUsers(dbConn)
    } catch (error){
        console.error(error)
        process.exit()
    } finally{
        await client.close()
    }
}
connectDb()
// ========= User Seeds =========

async function createUsers(dbConn){
    const userCollection = dbConn.collection("users")
    await userCollection.deleteMany({})
    const usernameArray = ['matt', 'york', 'wolf', 'james', 'quolt']
    const nicknameArray = ['nala', 'choco', 'squeeb', 'glip', 'mayhem']
    const passwordArray = ['poop', 'food','help', 'waste', 'taste']

    let i = 0
    while (i < 5){
        const username = usernameArray[i]
        const nickname = nicknameArray[i]
        try{
            const hashedPassword = await bcrypt.hash(passwordArray[i], 10)
            const newUser = {
                username: username,
                nickname: nickname,
                password: hashedPassword,
                thumbnail: ''
            }
            const addedUser = await userCollection.insertOne(newUser)
            console.log("success", addedUser)
        } catch (error){
            console.error(error)
        }
        i++
    }
}


