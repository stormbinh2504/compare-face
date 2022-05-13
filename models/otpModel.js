const mongoose = require('mongoose')
let timestampsStaffCode = new Date().getTime()
const userSchema = new mongoose.Schema({
    otp: {
        type: String,
    },
    email: {
        type: String,
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('otp', userSchema)