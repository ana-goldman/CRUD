const Employee = require('../models/employee');
const Department = require('../models/department');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('departmentId', 'name');
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error catching:', error);
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, surname, department } = req.body;
    const departmentDoc = await Department.findOne({ name: department });

    if (!name || !surname) {
      return res.status(400).json('Please enter a name and surname');
    }

    if (!departmentDoc) {
      return res.status(400).json('Department not found');
    }

    const checkEmployee = await Employee.findOne({
      name,
      surname,
      departmentId: departmentDoc._id,
    });
    if (checkEmployee) {
      return res.status(409).json({
        message: 'Employee already exists',
      });
    }

    const newEmployee = new Employee({ name, surname, departmentId: departmentDoc._id });
    await newEmployee.save();

    departmentDoc.employees.push(newEmployee._id);
    await departmentDoc.save();

    return res.status(201).json({
      message: 'Employee added successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const searchEmployee = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query) {
      return res.status(400).json('Query parameter is required');
    }

    const regex = new RegExp(query, 'i');
    const employees = await Employee.find({
      $or: [{ name: regex }, { surname: regex }],
    }).populate('departmentId', 'name');

    return res.status(200).json(employees);
  } catch (error) {
    console.error('Error searching employees:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const updateEmployeeById = async (req, res) => {
  try {
    const {
      employeeId,
      update: { name, surname, department },
    } = req.body;

    if (!employeeId) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { name, surname, department },
      { new: true },
    );

    return res.status(201).json({
      message: 'Employee updated successfully',
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error('Error updateing employee info:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  searchEmployee,
  updateEmployeeById,
};
