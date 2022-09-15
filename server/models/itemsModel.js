const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    desc: String
})

// https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9_Ball_(item)
// https://bulbapedia.bulbagarden.net/wiki/Great_Ball
// https://bulbapedia.bulbagarden.net/wiki/Ultra_Ball
// https://bulbapedia.bulbagarden.net/wiki/Super_Potion
// https://bulbapedia.bulbagarden.net/wiki/Potion#:~:text=The%20Potion%20(Japanese%3A%20%E3%82%AD%E3%82%BA%E3%81%90%E3%81%99,Max%20Potion%2C%20and%20Full%20Restore.

module.exports = mongoose.model("Item", itemSchema)