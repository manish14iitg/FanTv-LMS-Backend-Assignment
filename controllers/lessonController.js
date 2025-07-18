const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

exports.addLesson = async (req, res) => {
  const { title, videoUrl, resources } = req.body;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lesson = await Lesson.create({
      title,
      videoUrl,
      resources,
      course: course._id
    });

    // Add lesson to course's lesson list
    course.lessons.push(lesson._id);
    await course.save();

    res.status(201).json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add lesson' });
  }
};
