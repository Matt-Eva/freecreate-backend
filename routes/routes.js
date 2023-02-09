const express = require('express')
const router = express.Router()

const listingController = require("../controllers/listingController")
const usersController = require("../controllers/usersController")

router.get("/listings",listingController.index)

router.get("/users",usersController.index)

router.get('/login', async function (req, res){
    console.log('hit')
    req.session.userId = 1
    res.status(200).send('Logged In')
})

router.get('/authorize', usersController.authorize)

module.exports = router;