const express = require("express");
const { getItems, getItem } = require("../controllers/itemsController");

const router = express.Router();

//get all items
router.get("/", getItems);
//get a single item
router.get("/:id", getItem);

module.exports = router;
