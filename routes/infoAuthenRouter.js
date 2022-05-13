const router = require('express').Router()
const infoAuthenCtrl = require('../controllers/infoAuthenCtrl')

router.post('/otp', infoAuthenCtrl.sendOTPEmail)

module.exports = router