const Department = require('../models/department');
const { getDepartmentIdByName } = require('../utils/getDepartmentIdByName');

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Error catching:', error);
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { name } = req.body;
    const departmentId = await getDepartmentIdByName(name);

    if (!departmentId) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const department = await Department.findById(departmentId).populate('employees');
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

const updateDepartment = async (req, res) => {
  try {
    const { name, update } = req.body;
    const trimmedUpdate = typeof update === 'string' ? update.trim() : update;

    if (!name || !trimmedUpdate) {
      return res.status(400).json('Please provide a department name and an update');
    }

    const departmentId = await getDepartmentIdByName(name);

    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      { name: trimmedUpdate },
      { new: true },
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }

    return res.status(201).json({
      message: 'Department updated successfully',
      department: updatedDepartment,
    });
  } catch (error) {
    console.error('Error updateing department:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
};
