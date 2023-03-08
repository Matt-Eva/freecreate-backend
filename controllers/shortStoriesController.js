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

exports.search = async (req, res) =>{
    const tags = req.body.tags
    const date = req.body.date
    const genre = req.body.genre
    const currentDate = Date.now()
    const dateObj = {
        "Most Recent": null,
        "Past Day": currentDate - 8.64 * 10**7,
        "Past Week": currentDate - 6.05 * 10**8,
        "Past Month": currentDate - 2.62 * 10**9,
        "Past Year": currentDate - 3.14 * 10**10,
    }
    const dateRange = dateObj[date]

    console.log(dateRange)

    if (tags.length === 0 && dateRange){
        console.log("no tag but date")
    } else if(tags.length === 0){
        console.log("no tag no date")
    } else if (dateRange){
        console.log("tag and date")
    } else {
        console.log(" tag but no date")
    }

    console.log(req.body)
    res.send({message: "received"})
}