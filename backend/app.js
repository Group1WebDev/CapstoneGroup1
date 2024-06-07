const express = require('express');
const multer = require('multer');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Controllers
const userRegister = require('./controllers/userRegisterController');
const login = require('./controllers/loginController');

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
app.post('/userRegister', userRegister);
app.post('/login', login);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
