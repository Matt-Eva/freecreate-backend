// use walkthrough from here: https://www.mongodb.com/developer/products/mongodb/seed-database-with-fake-data/
require('dotenv').config({path: './config.env'});
const uri = process.env.ATLAS_URI
const {faker} = require('@faker-js/faker')

const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const bcrypt = require('bcrypt')
port = 4000
const genreArray = ["Romance", "Fantasy", "Action/Adventure", "Mystery", "Thriller", "Horror", "Sci-Fi", "Magical Realism", "Social Fiction", "Drama", "Comedy", "Literary Fiction", "Speculative Fiction", "Historical Fiction", "Erotica", "General Fiction"]

async function connectDb(){
    try{
        console.log("connecting")
        const connection = await client.connect()
        console.log("connected")
        await createUsers(connection)
        await createCreators(connection)
        await createShortStories(connection)
        await createUserPreferenceData(connection)
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
    console.log("creating users")
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
        } catch (error){
            console.error(error)
        }
        i++
    }
}

// ==== Creator Seeds =====

async function createCreators(conn){
    console.log("creating creators")
    const dbConn = conn.db('creators')
    const userCol = conn.db('users').collection('users')
    const creatorCollection = dbConn.collection("creator_profile")
    await creatorCollection.deleteMany({})
    const users = await userCol.find({}).toArray()

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
            i--
        }
    }
}

// ===== Content Seeds ====

async function createShortStories(conn){
    console.log("creating stories")
    const db = conn.db('short_stories')
    const content = db.collection('short_story_content')
    const search = db.collection('short_story_tag_search')
    await content.deleteMany({})
    await search.deleteMany({})
    const creators = await conn.db('creators').collection('creator_profile').find({}).toArray()
    for (const creator of creators){
        let i = 0;
        while(i < 10){
            let randomGenre = [genreArray[Math.floor(Math.random()* 15)], genreArray[Math.floor(Math.random()* 15)]].sort()
            if (randomGenre[0] === randomGenre[1]){
                randomGenre= randomGenre[0]
            }else {
                randomGenre = randomGenre.join("-")
            }
            const views = faker.datatype.number({min: 0, max: 100})
            const rank = views / 100 + faker.datatype.number({min: 0, max: 1000})
            const rel_rank = rank / views
            const image = faker.image.image()
            const dateRange = [0, 8.64 * 10**7, 6.05 * 10**8, 2.62 * 10**9, 3.14 * 10**10]
            const created_at = Date.now() - dateRange[(Math.floor(Math.random() * 5))]
            const year = (new Date()).getFullYear()
            const storyContent = {
                content: faker.lorem.paragraphs(3),
                username: creator.username,
                creatorName: creator.creatorName,
                thumbnail: image,
                creator_id: creator._id,
                user_id: creator.user_id,
                description: faker.lorem.paragraph(),
                creator_thumbnail: creator.creator_thumbnail,
                title: faker.random.words(), 
                genre: randomGenre,
                tags: [faker.random.word(), faker.random.word(), faker.random.word(), "fun", "chill", "intense", "hot"],
                rank: rank,
                rel_rank: rel_rank,
                views: views,
                created_at: created_at,
                year: year
            }
            
           const newStory= await content.insertOne(storyContent)
            const searchData = {
                story_id: newStory.insertedId,
                username: creator.username,
                creatorName: creator.creatorName,
                thumbnail: image,
                creator_id: creator._id,
                user_id: creator.user_id,
                description: faker.lorem.paragraph(),
                creator_thumbnail: creator.creator_thumbnail,
                title: faker.random.words(), 
                genre: randomGenre,
                tags: [faker.random.word().toLowerCase(), faker.random.word().toLowerCase(), faker.random.word().toLowerCase(), "fun", "chill", "intense", "hot"],
                rank: rank,
                rel_rank: rel_rank,
                views: views,
                created_at: created_at,
                year: year
            }
            await search.insertOne(searchData)
            i++
        }
    }
}

async function createUserPreferenceData(conn){
    const users = await conn.db('users').collection('users').find({}).toArray()
    const stories = await conn.db('short_stories').collection('short_story_content').find({}).toArray()
    console.log(stories.length)
    const lib_items = conn.db('users').collection('lib_items')
    const likes = conn.db('users').collection('likes')
    const list_items = conn.db('users').collection('list_items')
    await lib_items.deleteMany({})
    await likes.deleteMany({})
    await list_items.deleteMany({})
    const userArray = [["lib",lib_items], ["list",list_items], ["like",likes]]
    for (const user of users){
        let n = 0
        while(n<10){
            const index = Math.floor(Math.random() * stories.length)
            const story = stories[index]
            const i = Math.floor(Math.random() * 3)
            const collection = userArray[i][1]
            const type = userArray[i][0]
            console.log(type)
            const newData = {
                user_id: user._id,
                content_id: story._id,
                content_thumbnail: story.thumbnail,
                content_title: story.title,
                content_description: story.description,
                genre: story.genre,
                tags: story.tags
            }
            await collection.insertOne(newData)
            n++
        }
    }
}


