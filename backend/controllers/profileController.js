const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { userDesignation, userSkills, locDetail, bio, gender, userEducation, userExp } = req.body;

  if (req.file) {
    profilePicUrl = 'http://localhost:5001/profiles/' + req.file.filename;
  }

  try {
    const user = await User.updateOne({ _id: id }, { userDesignation, userSkills, locDetail, bio, gender, userEducation: JSON.parse(userEducation), userExp: JSON.parse(userExp), profilePic: profilePicUrl });
    res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(200).send({ data: user });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'user not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'old password is incorrect' });
    }

    const samePassword = await bcrypt.compare(newPassword, user.password);
    if (samePassword) {
      return res.status(400).json({ success: false, message: 'new password is same' });
    }

    const saltBy10 = 10;
    const updatedPasswordHashed = await bcrypt.hash(newPassword, saltBy10);

    user.password = updatedPasswordHashed;
    await user.save();

    return res.status(200).json({ success: true, message: 'password changed' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'err changing password' });
  }
};

module.exports = { updateProfile, getUserProfile, changePassword };
