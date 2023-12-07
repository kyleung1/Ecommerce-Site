const express = require("express");
const {
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all item routes
router.use(requireAuth);

//post a new item
router.post("/", createItem);
//delete an item
router.delete("/:id", deleteItem);
//update an item
router.patch("/:id", updateItem);

module.exports = router;
