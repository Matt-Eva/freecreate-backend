const db = require('../db/conn.js')

exports.index = async (req, res)=>{
    const dbConn = db.getStoryDb()
    const storyCollection = dbConn.collection("short_story_tag_search")
    try{
        const stories = await storyCollection.find({}).limit(50).toArray()
        return res.status(200).send(stories)
    } catch(error){
        return res.send({error: error})
    }
}