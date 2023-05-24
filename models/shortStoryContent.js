const {ErrorHandler} = require("./error-handler.js")

class ShortStoryContent extends ErrorHandler {
    constructor(data){
        const urlId = `${data.username}/${data.creatorname}/${data.title}`

        this.url_id = urlId
        this.content = data.content
        this.username = data.username
        this.user_id = data.user_id
        this.thumbnail = data.thumbnail
        this.year = new Date().getFullYear
    }
}

module.exports = {ShortStoryContent}