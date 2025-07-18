const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructorName: String,
  price: Number,
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
