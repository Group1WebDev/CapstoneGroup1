const Users = require('../models/userModel');
const nodemailer = require("nodemailer");
const SavedOTPS = require('../models/otpTable.js');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.PROJECT_EMAIL,
    pass: process.env.PROJECT_PASSWORD,
  },
});

const generateOTP = async (req, res) => {
  const { userEmail } = req.body;

  try {
    const userExist = await Users.exists({ email: userEmail });

    if (!userExist) {
      return res.status(404).json({ error: 'Email not found in registered users, please register or check your email' });
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    const otpExpiration =  Date.now()+300000

    await SavedOTPS.updateOne(
      { email: userEmail },
      { email: userEmail, otp: generatedOTP, expiration: otpExpiration },
      { upsert: true }
    );

    // EMAIL FUNCTIONALITY
    const mailCreds = {
      from: '"Capstone Group1" <conestoga.capstonegroup1@gmail.com>',
      to: userEmail,
      subject: 'OTP Code',
      text: `OTP to reset your Talenthunt Portal password reset is ${generatedOTP}`,
      html: `<b>OTP to reset your Talenthunt Portal password reset is ${generatedOTP}</b>`,
    };
  
    const info = await transporter.sendMail(mailCreds);

    res.status(200).json({ message: 'OTP generated successfully', generatedOTP });
  }
  catch (error) {
    console.error('err', error);
    res.status(500).json({ error: 'server err' });
  }
};

module.exports = generateOTP;
