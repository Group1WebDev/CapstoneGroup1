const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const SavedOTPS = require('../models/otpTable.js');

async function updatePassword(req, res) {
  try {
    const { userEmail, otp, newPass } = req.body;
    if (!userEmail || !otp || !newPass) {
      console.error('fields are required');
      return res.status(400).json({ error: 'fields are required' });
    }
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      console.error('user not found');
      return res.status(401).json({ error: 'user not found' });
    }

    // digit match and check isNumber and length is 4 to 6
    if (!/^\d{6}$/.test(otp)) {
      console.error('otp must be of 6 digitsd max only');
      return res.status(400).json({ error: 'otp must be of 6 digits max only' });
    }

    const savedOtps = await SavedOTPS.findOne({ email: userEmail });
    if (!savedOtps) {
      console.error('OTP not found');
      return res.status(401).json({ error: 'OTP not found' });
    }

    if (savedOtps.otp !== otp || savedOtps.expiration < Date.now()) {
      return res.status(400).json({ error: 'OTP is not valide or expired' });
    }


    const hashedNewPass = await bcrypt.hash(newPass, 10);

    user.password = hashedNewPass;
    await user.save();

    await SavedOTPS.deleteOne({ email: userEmail });
    
    res.status(200).json({ message: 'password updated' });
  } catch (error) {
    console.error('err:', error);
    return res.status(500).json({ error: 'server error' });
  }
}
module.exports = updatePassword;
