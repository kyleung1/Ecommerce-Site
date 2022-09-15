const express = require('express')
const {
    getItems,
    getItem
} = require("../controllers/itemsController")

const router = express.Router()

//get all users
router.get('/', getItems)
//get a single user
router.get('/:id', getItem)

module.exports = router