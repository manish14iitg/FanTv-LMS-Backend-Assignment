const express = require('express');
const router = express.Router();
const { addQuiz } = require('../controllers/quizController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin: Add quiz to a course
router.post('/:courseId/quizzes', protect, adminOnly, addQuiz);

module.exports = router;
