import express from "express"
import {login, me, logout, signup, } from "../controllers/usersController.js"
import  {topStories, createShortStory, searchShortStory} from "../controllers/shortStoriesController.js"


const router = express.Router()

// === USER ROUTES ===

router.post('/users', signup)

router.post('/login', login)

router.get('/me', me)

router.delete('/logout', logout)

// === SHORT STORY ROUTES ===

router.get('/stories', topStories)

router.post('/search', searchShortStory)

router.post('/stories', createShortStory)

export default router