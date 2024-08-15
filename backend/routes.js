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
const path = require('path');
const htmlTopdf = require('html-pdf');
const resumePDF = require('./resume_download.js');

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
router.post('/', (req, res) => {
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

router.post('/forgotPassword', forgotPassword);
router.post('/generateOTP', generateOTP);
router.post('/gemini-res', geminiController.geminiRun);

router.post('/create-pdf', (req, res) => {
  htmlTopdf.create(resumePDF(req.body), {}).toFile('resume.pdf', (err) => {
    if (err) {
      res.status(400).json({ message: 'err 53 Line Pdf' });
    } else {
      res.status(200).json({ message: 'resume created' });
    }
  });
});

router.get('/get-resume', (req, res) => {
  const resumeGet = path.join(__dirname, 'resume.pdf');
  res.sendFile(resumeGet);
});
module.exports = router;
