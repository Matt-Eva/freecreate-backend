const { send } = require('express/lib/response')
const { restart } = require('nodemon')
const db = require('../db/conn.js')

exports.index = async (req, res)=>{
    const dbConn = db.getStoryDb()
    const storyCollection = dbConn.collection("short_story_tag_search")
    try{
        const rankStories = await storyCollection.find({}).sort({rank: -1}).limit(50).toArray()
        const relRankStories = await storyCollection.find({}).sort({rel_rank: -1}).limit(50).toArray()
        return res.status(200).send({rankStories, relRankStories})
    } catch(error){
        return res.send({error: error})
    }
}

exports.search = async (req, res) =>{
    const storyDb = db.getStoryDb()
    const tagSearch = storyDb.collection('short_story_tag_search')
    const tags = req.body.tags
    const date = req.body.date
    const genre = req.body.genre
    const currentDate = Date.now()
    const year = (new Date()).getFullYear()
    const dateObj = {
        "Most Recent": null,
        "Past Day": currentDate - 8.64 * 10**7,
        "Past Week": currentDate - 6.05 * 10**8,
        "Past Month": currentDate - 2.62 * 10**9,
        "Past Year": currentDate - 3.14 * 10**10,
    }
    const dateRange = dateObj[date]

    try{
        if (tags.length === 0 && dateRange){
            console.log("no tag but date")
            const query = {year: year, genre: genre, created_at: {$gte: dateRange}}
            const rankStories = await tagSearch.find(query).sort({rank: -1}).limit(50).toArray()
            const relRankStories = await tagSearch.find(query).sort({rel_rank: -1}).limit(50).toArray()
           return res.status(200).send({rankStories: rankStories, relRankStories: relRankStories})

        } else if(tags.length === 0){
            console.log("no tag no date")
            const query = {year: year, genre: genre}
            const rankStories = await tagSearch.find(query).sort({created_at: -1, rank: -1}).limit(50).toArray()
            const relRankStories = await tagSearch.find(query).sort({created_at: -1, rel_rank: -1}).limit(50).toArray()
           return res.status(200).send({rankStories: rankStories, relRankStories: relRankStories})
        } else if (dateRange){
            console.log("tag and date")
            const query = {year: year, genre: genre, tags: {"$all": tags}, created_at: {$gte: dateRange}}
            const rankStories = await tagSearch.find(query).sort({rank: -1}).limit(50).toArray()
            const relRankStories = await tagSearch.find(query).sort({rel_rank: -1}).limit(50).toArray()
           return res.status(200).send({rankStories: rankStories, relRankStories})
        } else {
            console.log("tag but no date")
            const query = {year: year, genre: genre, tags: {"$all": tags}}
            console.log(query)
            const rankStories = await tagSearch.find(query).sort({created_at: -1, rank: -1}).limit(50).toArray()
            const relRankStories = await tagSearch.find(query).sort({created_at: -1, rel_rank: -1}).limit(50).toArray()
           return res.status(200).send({rankStories: rankStories, relRankStories})
        }
    } catch(error){
        console.error(error)
       return res.status(404).send({error: error})
    }


    // console.log(req.body)
    // res.send({message: "received"})
}