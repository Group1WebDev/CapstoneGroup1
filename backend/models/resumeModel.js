const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  first_name: { type: String, required: true },
  last_name: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  professional_summary: {
    type: String,
  },
  work_experience: [
    {
      position_title: {
        type: String,
        required: true,
      },
      company_name: { type: String, required: true },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      start_date: {
        type: Date,
      },
      end_date: {
        type: Date,
      },
      work_summary: {
        type: String,
        required: true,
      },
    },
  ],
  education: [
    {
      school_name: {
        type: String,
        required: true,
      },
      degree: { type: String, required: true },
      school_location: {
        type: String,
        required: true,
      },
      start_date: {
        type: Date,
      },
      end_date: {
        type: Date,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  key_skills: {
    type: String,
    required: true,
  },
});

const resume = mongoose.model('resume', resumeSchema);

module.exports = resume;
