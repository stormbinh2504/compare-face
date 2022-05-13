const router = require('express').Router()
const auth = require("../middleware/auth")
const userCtrl = require("../controllers/userCtrl")



router.get('/user/:id', userCtrl.getUser)

// router.put('/user/:id', userCtrl.updateUser)
router.put('/user', auth, userCtrl.updateUser)

module.exports = router