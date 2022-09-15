const express = require('express')
const {
    createItem,
    deleteItem,
    updateItem,
} = require("../controllers/itemsController")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all item routes
router.use(requireAuth)

//post a new user
router.post('/', createItem)
//delete a user
router.delete('/:id', deleteItem)
//update a user
router.patch('/:id', updateItem)

module.exports = router