const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

exports.markLessonCompleted = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const userId = req.user._id;

  try {
    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new Progress({ user: userId, course: courseId, completedLessons: [] });
    }

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    await progress.save();
    res.json({ message: 'Lesson marked completed', progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating progress' });
  }
};

exports.attemptQuiz = async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body; // array of selected option indexes
  const userId = req.user._id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const total = quiz.questions.length;
    let score = 0;

    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswerIndex) score++;
    });

    const courseId = quiz.course;

    let progress = await Progress.findOne({ user: userId, course: courseId });
    if (!progress) {
      progress = new Progress({ user: userId, course: courseId });
    }

    progress.quizAttempts.push({
      quiz: quiz._id,
      score,
      total
    });

    await progress.save();
    res.json({ message: 'Quiz submitted', score, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting quiz' });
  }
};

exports.getCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  try {
    const course = await Course.findById(courseId).populate('lessons');
    const progress = await Progress.findOne({ user: userId, course: courseId });

    const totalLessons = course.lessons.length;
    const completedLessons = progress?.completedLessons?.length || 0;

    const percentage = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

    res.json({
      completedLessons,
      totalLessons,
      percentage,
      quizAttempts: progress?.quizAttempts || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching progress' });
  }
};

