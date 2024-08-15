const mongoose = require('mongoose');



const jobPostingSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  posted_by:{
    type:mongoose.Schema.Types.ObjectId,ref:"User"
  },
  jobCategory: {
    type: String,
    enum: ['technology', 'finance', 'marketing', 'food', 'construction', 'other'],
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
  jobStatus: {
    type: Boolean,
    default: true,
  },
  jobVacancies: {
    type: Number,
    required: true,
  },
  jobApplications: {
    type: Number,
    default: 0
  },
  applied_by:[
    {
      userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
      expYears: {
        type: Number,
      },
      resume: {
        type: String,
       
      },
      coverLetter: {
        type: String,
       
      }
    }
  ]
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;