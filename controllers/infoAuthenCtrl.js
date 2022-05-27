
const sendEmail = require("../ultils/sendEmail")
const { genOTP, verifyOTP } = require("../ultils/gen2FA")
const Users = require("../models/userModel");
const OTPs = require("../models/otpModel");

const infoAuthenCtrl = {
    sendOTPEmail: async (req, res) => {
        try {
            const { email } = req.body;

            let OTPCode = await genOTP()
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
    verifyOTPEmail: async (req, res) => {
        try {
            const { numberOTP } = req.body;
            let OTPCode = await verifyOTP(numberOTP)
            if (OTPCode) {
                res.json({
                    msg: "Verify OTP Success!",
                    OTPCode: OTPCode,
                    isVerifyEmail: true,
                });
            } else {
                res.json({
                    msg: "Verify OTP fail!",
                    isVerifyEmail: false,
                });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },
    authenOTP: async (req, res) => {

    },
}

module.exports = infoAuthenCtrl;