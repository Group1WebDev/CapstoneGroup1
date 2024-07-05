const express = require('express');
const multer = require('multer');

// Controllers
const userRegister = require('./controllers/userRegisterController');
const login = require('./controllers/loginController');
const jobController = require('./controllers/employer/jobController');
const forgotPassword = require('./controllers/forgotPasswordController');
const generateOTP = require('./controllers/otpController');

const router = express.Router();

// Multer for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });
// app.post('/', upload.single('image'), 'RouteName');

// Routes
router.post('/userRegister', userRegister);
router.post('/login', login);

// jobController
router.post('/jobs', jobController.createJobPosting);
router.get('/jobs', jobController.getJobPostings);
router.get('/jobs/:id', jobController.getJobPostingById);
router.patch('/jobs/:id', jobController.updateJobPosting);
router.delete('/jobs/:id', jobController.deleteJobPosting);

router.post('/forgotPassword', forgotPassword);
router.post('/generateOTP', generateOTP);

module.exports = router;
