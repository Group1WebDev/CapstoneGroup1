const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    enum: ['Web Developer', 'Web Designer', 'Content Writer'],
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Part-Time', 'Full-Time'],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Expert'],
    required: true,
  },
  minSalary: {
    type: Number,
    required: true,
  },
  maxSalary: {
    type: Number,
    required: true,
  },
  languageRequirement: {
    type: [String],
    enum: ['English', 'Spanish', 'French'],
  },
  jobDescription: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
