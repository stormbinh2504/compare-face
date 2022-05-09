const mongoose = require('mongoose')
let timestampsStaffCode = new Date().getTime()
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 25,
        // trim: true,
        // unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
        // default: 'https://res.cloudinary.com/stormbinh2504/image/upload/v1624526109/hinh_anh_dep_girl_xinh_2018-_hinh_gai_xinh_1_cyxxxg.jpg'
    },
    hashAvatar: {
        type: String,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('user', userSchema)