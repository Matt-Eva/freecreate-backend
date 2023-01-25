const express = require('express')
const router = express.Router()

const listingController = require("../controllers/listingController")
const usersController = require("../controllers/usersController")

router.route("/listings")
    .get(listingController.index)

router.route("/users")
    .get(usersController.index)

module.exports = router;