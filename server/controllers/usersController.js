const User = require('../models/usersModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.SECRET, { expiresIn: "3d"})
}

//get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

//get a single user
const getUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

//create a new user
const createUser = async (req, res) => {
    const {email, password, admin} = req.body
    try {
        const user = await User.register(email, password, admin)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, admin})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)

}

//update a user
//needs to add token hashing
const updateUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        //check if admin
        const admin = user.admin

        res.status(200).json({email, token, admin})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    loginUser,
}