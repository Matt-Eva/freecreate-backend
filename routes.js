const express = require('express')
const router = express.Router()

const db = require ('./conn.js')

router.get( "/listings", async function (_req, res){
    // res.send("success!")
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

module.exports = router;