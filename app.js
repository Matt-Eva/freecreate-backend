require('dotenv').config({path: './config.env'});

const express = require('express');
const app = express()
const port = process.env.PORT || 4000

const db = require("./conn.js")

db.connetToServer(function(err){
    if(err){
        console.error(err)
        process.exit()
    }
    app.listen(port, () =>{
        console.log(`app running on port: ${port}`)
    })
})

app.get('/listings', async function(req, res){
    const dbConn = db.getDbConn()
    try {
        console.log("fetching listings")
        const listings = await dbConn
                                    .collection('listingsAndReviews')
                                    .find({})
                                    .limit(50)
                                    .toArray()
        res.status(200).json(listings)
    } catch (error){
        console.error(error)
        res.status(400)
    }
})