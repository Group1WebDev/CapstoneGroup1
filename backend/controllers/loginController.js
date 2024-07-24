const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwtToken = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'User not found' });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwtToken.sign({ id: user._id }, process.env.JWT_SECRET || 'AI_PROJ', {
      expiresIn: '2h',
    });

    res.status(200).json({ token: token, user: { id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname, role:user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};