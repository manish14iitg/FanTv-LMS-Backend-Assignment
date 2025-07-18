const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const progressRoutes = require('./routes/progressRoutes');

const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.'
});

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use(apiLimiter);

// Connect to MongoDB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('LMS API is running...');
});



app.use('/api/auth', authRoutes);

app.use('/api/courses', courseRoutes);

app.use('/api/courses', lessonRoutes); 

app.use('/api/courses', quizRoutes);

app.use('/api/progress', progressRoutes);
// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));