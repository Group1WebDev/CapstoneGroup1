const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    profilePic:{
      type: String,
      default:null
    },
    role: {
      type: String,
      enum: ['employer', 'user'],
      default: 'user',
    },
    userDesignation: {
      type: String,
      default: null
    },
    userSkills: {
      type: [String],
      default: null
    },
    locDetail:{
      type:String,
      default:null
    },
    bio:{
      type:String,
      default:null
    },
    gender:{
      type:String,
      default:null
    },
    userEducation:{
      
        institutionName:String,
        field:String,
        completionDate:Date
      
    
    },
    userExp:{
     
        companyName:String,
        jobDesignation:String,
        jobStartDate:Date,
        jobEndDate:Date,
     
    }
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
