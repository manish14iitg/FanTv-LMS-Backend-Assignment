const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

exports.addQuiz = async (req, res) => {
  const { courseId } = req.params;
  const { questions } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const quiz = await Quiz.create({ course: courseId, questions });

    // Link to course
    course.quizzes.push(quiz._id);
    await course.save();

    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add quiz' });
  }
};
