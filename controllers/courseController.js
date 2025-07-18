const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructorName, price } = req.body;
    const course = await Course.create({ title, description, instructorName, price });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error creating course' });
  }
};

exports.getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().select('-lessons -quizzes');
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching courses' });
//   }
    // GET /api/courses?page=1&limit=10
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find().skip(skip).limit(limit);
    const total = await Course.countDocuments();

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      courses,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    console.log("getting this id in get courses by id", req.params.id);
    const course = await Course.findById(req.params.id)
      .populate('lessons')
      .populate('quizzes');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.log("error in get course by id", err);
    res.status(500).json({ message: 'Error fetching course' });
  }
};
