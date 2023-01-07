const express = require('express')
const router = express.Router()

const listingController = require("../controllers/listingController")

router.route("/listings")
    .get(listingController.index)

module.exports = router;