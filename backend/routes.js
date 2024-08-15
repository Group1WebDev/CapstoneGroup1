const express = require('express');
const multer = require('multer');

// Controllers
const userRegister = require('./controllers/userRegisterController');
const login = require('./controllers/loginController');
const jobController = require('./controllers/employer/jobController');
const forgotPassword = require('./controllers/forgotPasswordController');
const generateOTP = require('./controllers/otpController');
const updateProfile = require('./controllers/profileController');
const geminiController = require('./controllers/geminiController');
const resumesetupController = require('./controllers/resumesetupController');

const router = express.Router();

// Multer for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });
// app.post('/', upload.single('image'), 'RouteName');

// Routes
router.get('/', (req, res) => {
  res.status(400).json({ message: 'test' });
});
router.post('/userRegister', userRegister);
router.post('/login', login);
router.get('/get_Userprofile/:id', updateProfile.getUserProfile);
router.post('/updateProfile/:id', upload.single('profile'), updateProfile.updateProfile);

// jobController
router.post('/jobs', jobController.createJobPosting);
router.get('/jobs', jobController.getJobPostings);
router.get('/jobs-by-employer/:id', jobController.getJobsPostedByEmployer);
router.get('/jobs/:id', jobController.getJobPostingById);
router.patch('/jobs/:id', jobController.updateJobPosting);
router.delete('/jobs/:id', jobController.deleteJobPosting);
router.post('/jobs/:id', upload.single('resume'), jobController.applyToJob);

router.post('/change-password', updateProfile.changePassword);

router.post('/forgotPassword', forgotPassword);
router.post('/generateOTP', generateOTP);
router.post('/gemini-res', geminiController.geminiRun);

router.post('/create-pdf', resumesetupController.createPDF);
router.get('/get-resume', resumesetupController.getResume);
module.exports = router;
