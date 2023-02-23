const express = require('express')
const router = express.Router()

const listingController = require("../controllers/listingController")
const usersController = require("../controllers/usersController")

router.get("/listings",listingController.index)

// === USER ROUTES ===

router.post('/users', usersController.create)

router.post('/login', usersController.login)

router.get('/me', usersController.authorize)

router.delete('/logout', usersController.logout)

module.exports = router;