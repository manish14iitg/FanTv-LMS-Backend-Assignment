const express = require('express');
const router = express.Router();
const {
  markLessonCompleted,
  attemptQuiz,
  getCourseProgress
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

// Mark a lesson completed
router.post('/:courseId/lessons/:lessonId/complete', protect, markLessonCompleted);

// Submit a quiz attempt
router.post('/quizzes/:quizId/attempt', protect, attemptQuiz);

// Get course progress
router.get('/:courseId', protect, getCourseProgress);

module.exports = router;
