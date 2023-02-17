const express = require('express')
const router = express.Router()

const listingController = require("../controllers/listingController")
const usersController = require("../controllers/usersController")

router.get("/listings",listingController.index)

// === USER ROUTES ===

router.post('/users', usersController.create)

router.get('/login', usersController.login)

router.get('/authorize', usersController.authorize)

module.exports = router;