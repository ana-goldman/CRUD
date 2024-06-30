const Department = require('../models/department');

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Error catching:', error);
  }
};

const getDepartmentByName = async (req, res) => {
  try {
    const { name } = req.params;
    const department = await Department.findOne({
      // case insensitive
      name: { $regex: new RegExp(`^${name}$`, 'i') },
    }).populate('employees');

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error('Error fetching department:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json('Please enter a name of department');
    }

    const checkDepartment = await Department.findOne({ name });
    if (checkDepartment) {
      return res.status(409).json({
        message: 'Department already exists',
      });
    }

    const newDepartment = new Department({ name });
    await newDepartment.save();

    return res.status(201).json({
      message: 'Department added successfully',
      department: newDepartment,
    });
  } catch (error) {
    console.error('Error creating department:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentByName,
  addDepartment,
};
