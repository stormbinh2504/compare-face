const otpGenerator = require('otp-generator')

async function genOTP(number) {
    // return otpGenerator.generate(numbe, { numbe: true });
    let codeOtp
    switch (number) {
        case 6:
            codeOtp = Math.floor(100000 + Math.random() * 900000)
            break;
        case 4:
            codeOtp = Math.floor(1000 + Math.random() * 9000);
            break;
        default:
            break;
    }

    return codeOtp
}

module.exports = {
    genOTP
}