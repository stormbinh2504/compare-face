

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'nnbinh2504@gmail.com',
        pass: 'qvtwulqxbhpvsgin'
    },
    tls: {
        rejectUnauthorized: false,
    }
});

async function sendEmail(emailSend, infoSend) {

    let sendResult
    var mailOptions = {
        from: 'kimanh2012@gmail.com',
        to: emailSend,
        subject: 'Sending Email using Node.js',
        text: `Mã OTP: ${infoSend}`
    };

    await transporter.sendMail(mailOptions)
        .then(function (res) {
            sendResult = res
        })
        .catch(function (res) {
            console.log(res);
        })

    return sendResult
}


module.exports = sendEmail