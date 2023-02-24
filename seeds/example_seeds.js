// use walkthrough from here: https://www.mongodb.com/developer/products/mongodb/seed-database-with-fake-data/
const {faker} = require('@faker-js/faker')
console.log(faker.name.firstName())
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const bcrypt = require('bcrypt')
port = 4000

async function connectDb(){
    try{
        console.log("connecting")
        const connection = await client.connect()
        console.log("connected")
        await createUsers(connection)
        await createCreators(connection)
        logHello()
    } catch (error){
        console.error(error)
        process.exit()
    } finally{
        await client.close()
    }
}
connectDb()
// ========= User Seeds =========

function logHello(){
    console.log("hello")
}

async function createUsers(conn){
    const dbConn = conn.db('users')
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
                thumbnail: faker.image.avatar()
            }
            const addedUser = await userCollection.insertOne(newUser)
            // console.log("success", addedUser)
        } catch (error){
            console.error(error)
        }
        i++
    }
}

// ==== Creator Seeds =====

async function createCreators(conn){
    const dbConn = conn.db('creators')
    const userCol = conn.db('users').collection('users')
    const creatorCollection = dbConn.collection("creator_profile")
    await creatorCollection.deleteMany({})
    const users = await userCol.find({}).toArray()
    const genreArray = ["Romance", "Fantasy", "Action/Adventure", "Mystery", "Thriller", "Horror", "Sci-Fi", "Magical Realism", "Social Fiction", "Drama", "Comedy", "Literary Fiction", "Speculative Fiction", "Historical Fiction", "Erotica", "General Fiction"]
    for (const user of users){
        let i = 3;
        while ( i > 0){
            const tagArray = [genreArray[i], genreArray[15-i]]
            const creator = {
                username: user.username,
                creatorName: faker.name.firstName(),
                user_id: user._id,
                creator_thumbnail: faker.image.avatar(),
                tags: tagArray,
                description: faker.lorem.paragraph(),
                search_terms: ''
            }
            const newCreator = await creatorCollection.insertOne(creator)
            console.log(newCreator)
            i--
        }
    }
}


