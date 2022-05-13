
const sendEmail = require("../ultils/sendEmail")
const { genOTP } = require("../ultils/gen2FA")
const Users = require("../models/userModel");
const OTPs = require("../models/otpModel");

const infoAuthenCtrl = {
    sendOTPEmail: async (req, res) => {
        try {
            const { email } = req.body;

            let OTPCode = await genOTP(6)
            let infoEmail = await sendEmail(email, OTPCode)
            let foundOTP = await OTPs.findOne({ email: email })

            if (foundOTP) {
                await OTPs.findOneAndUpdate({ email: email }, { otp: OTPCode }, {
                    new: true
                })
            } else {
                const newOTPs = new OTPs({
                    email: email,
                    otp: OTPCode,
                });
                newOTPs.save();
            }

            res.json({
                msg: "Send Emaill Success!",
                infoEmail,
                OTP: OTPCode,
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
    authenOTP: async (req, res) => {

    },
}

module.exports = infoAuthenCtrl;