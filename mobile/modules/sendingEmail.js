const nodeMailer = require("nodemailer");
const { generateOtp } = require("./otpGenerator");

module.exports = {
  SendMail: (email, callback) => {
    let otp = generateOtp();
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssshashini21@gmail.com",
        pass: "nxtbmpobvwhkzwdj",
      },
    });

    let mailOptions = {
      from: "ssshashini21@gmial.com",
      to: email,
      subject: "YOUR OTP NUMBER",
      text: `Your OTP NUMBER IS ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return callback(error);
      } else {
        //console.log(info.response);
        return callback(null, otp);
      }
    });
  },
};
