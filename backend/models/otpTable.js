const mongoose = require('mongoose');

const otpData = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiration: {type: Date}
});

const SavedOTPS = mongoose.model('SavedOTPS', otpData);

module.exports = SavedOTPS;