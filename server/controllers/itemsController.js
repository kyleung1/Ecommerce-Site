const Item = require('../models/itemsModel')
const mongoose = require('mongoose')

//get all items
const getItems = async (req, res) => {
    const items = await Item.find({}).sort({createdAt: -1})
    res.status(200).json(items)
}

//get a single item
const getItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such item'})
    }    

    const item = await Item.findById(id)

    if (!item) {
        return res.status(404).json({error: 'No such Item'})
    }
    res.status(200).json(item)
}

//create a new item
const createItem = async (req, res) => {
    const {name, price, stock, desc} = req.body
    try {
        const item = await Item.create({name, price, stock, desc})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such item'})
    }    

    const item = await Item.findOneAndDelete({_id: id})

    if (!item) {
        return res.status(404).json({error: 'No such Item'})
    }
    res.status(200).json(item)
}

//update an item
const updateItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such item'})
    }    

    const item = await Item.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({error: 'No such Item'})
    }
    res.status(200).json(item)
}

module.exports = {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
}