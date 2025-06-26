const Student = require('../models/Student');

// Create student
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(" Saved Successfully ");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one student
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    student ? res.json(student) : res.status(404).json({ error: 'Not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update(req.body);
      res.json(student);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
