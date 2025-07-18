const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById
} = require('../controllers/courseController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin: Create course
router.post('/', protect, adminOnly, createCourse);

// Public: View all courses
router.get('/', getAllCourses);

// Public: View single course with lessons + quizzes
router.get('/:id', getCourseById);

module.exports = router;
