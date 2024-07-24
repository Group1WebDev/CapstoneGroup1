const generateOTP = (req, res) => {
  res.status(200).json({ message: 'OTP created' });
};

module.exports = generateOTP;
