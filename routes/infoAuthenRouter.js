const router = require('express').Router()
const infoAuthenCtrl = require('../controllers/infoAuthenCtrl')

router.post('/gen-otp', infoAuthenCtrl.sendOTPEmail)

router.post('/verify-otp', infoAuthenCtrl.verifyOTPEmail)

module.exports = router