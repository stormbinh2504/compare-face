const otpGenerator = require('otp-generator')
const speakeasy = require("speakeasy");

async function genOTP(number) {
    // return otpGenerator.generate(numbe, { numbe: true });
    // let codeOtp
    // switch (number) {
    //     case 6:
    //         codeOtp = Math.floor(100000 + Math.random() * 900000)
    //         break;
    //     case 4:
    //         codeOtp = Math.floor(1000 + Math.random() * 9000);
    //         break;
    //     default:
    //         break;
    // }
    return speakeasy.totp({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        digits: 6,
        step: 60,
        window: 10
    });
}

async function verifyOTP(token) {
    return speakeasy.totp.verify({
        secret: process.env.OTP_KEY,
        encoding: 'base32',
        token: token,
        step:60,
        window: 10,
    });
}



module.exports = {
    genOTP,
    verifyOTP
}