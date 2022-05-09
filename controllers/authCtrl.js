const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const authCtrl = {
    register: async (req, res) => {
        try {
            const { username, password, avatar, hashAvatar } = req.body;
            let newUserName = username.toLowerCase().replace(/ /g, "");

            const user_name = await Users.findOne({ username: newUserName });

            if (user_name)
                return res.status(400).json({ msg: "This user name already exists." });

            if (password.length < 6)
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters." });
            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                username: username,
                password: passwordHash,
                avatar: avatar,
                hashAvatar: hashAvatar,
            });

            const access_token = createAccessToken({ id: newUser._id });
            const refresh_token = createRefreshToken({ id: newUser._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
            });

            await newUser.save();


            res.json({
                msg: "Register Success!",
                access_token,
                user: {
                    ...newUser._doc,
                    password: "",
                },
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await Users.findOne({ username })

            const isMatch = await bcrypt.compare(password, user.password);

            if (!user)
                return res.status(400).json({ msg: "This user does not exist." });

            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
            });

            res.json({
                msg: "Login Success!",
                access_token,
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
            return res.json({ msg: "Logged out!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = authCtrl;