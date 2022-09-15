const express = require('express')
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
} = require('../controllers/usersController')

const router = express.Router()

//get all users
router.get('/', getUsers)
//get a single user
router.get('/:id', getUser)
//post a new user
router.post('/register', createUser)
//delete a user
router.delete('/:id', deleteUser)
//update a user
router.patch('/:id', updateUser)
//login a user
router.post('/login', loginUser)

module.exports = router