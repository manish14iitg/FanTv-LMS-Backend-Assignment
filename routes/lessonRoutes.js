const express = require('express');
const router = express.Router();
const { addLesson } = require('../controllers/lessonController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin: Add lesson to a course
router.post('/:courseId/lessons', protect, adminOnly, addLesson);

module.exports = router;
