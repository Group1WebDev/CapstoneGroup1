const User = require('../models/userModel');
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

module.exports = { updateProfile, getUserProfile };
