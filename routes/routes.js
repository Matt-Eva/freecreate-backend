const express = require('express')
const router = express.Router()

const usersController = require("../controllers/usersController")
const shortStoriesController = require("../controllers/storiesController")


// === USER ROUTES ===

router.post('/users', usersController.create)

router.post('/login', usersController.login)

router.get('/me', usersController.me)

router.delete('/logout', usersController.logout)

// === SHORT STORY ROUTES ===

router.get('/stories', shortStoriesController.index)

router.post('/search', shortStoriesController.search)

module.exports = router;