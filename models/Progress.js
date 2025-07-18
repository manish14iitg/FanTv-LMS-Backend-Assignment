const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  total: Number,
  attemptedAt: { type: Date, default: Date.now }
});

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  quizAttempts: [quizAttemptSchema]
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
