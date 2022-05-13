
const Users = require("../models/userModel");

const userCtrl = {
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password')

            if (!user) return res.status(400).json({ msg: "User does not exist." })

            res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { email, phone } = req.body

            let _user = await Users.findOneAndUpdate({ _id: req.body.user._id }, { email: email, phone: phone }, {
                new: true
            })
            
            res.json({
                msg: "Update Success!",
                user: _user,
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = userCtrl;