const express = require('express')
const {
    checkout,
    test1
} = require("../controllers/checkoutController")

const router = express.Router()

router.post('/', checkout)
router.get('/', test1)

module.exports = router