const User = require('../models/userModel');
const bcrypt = require('bcrypt');

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

    // digit match and check isNumber and length is 4
    if (!/^\d{4}$/.test(otp)) {
      console.error('wrong OTP');
      return res.status(400).json({ error: 'wrong OTP' });
    }

    const hashedNewPass = await bcrypt.hash(newPass, 10);
    user.password = hashedNewPass;
    await user.save();
    console.log('password updated');
    res.status(200).json({ message: 'password updated' });
  } catch (error) {
    console.error('err:', error);
    return res.status(500).json({ error: 'server error' });
  }
}
module.exports = updatePassword;
