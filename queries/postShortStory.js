const { ShortStoryContent } = require("../models/shortStoryContent")
const { ShortStoryTagSearch } = require("../models/shortStoryTagSearch")

async function postShortStory(data){
    console.log("hit post")
    console.log(req.body)
    const dbConn = db.getStoryDb()
    const tagCollection = dbConn.collection("short_story_tag_search")
    const contentCollection = dbConn.collection("short_story_content")
}