const Employee = require('../models/employee');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error catching:', error);
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, department } = req.body;

    if (!name || !department) {
      return res.status(400).json('Please enter a name and department');
    }

    const checkEmployee = await Employee.findOne({ name, department });
    if (checkEmployee) {
      return res.status(409).json({
        message: 'Employee already exists',
      });
    }

    const newEmployee = new Employee({ name, department });
    await newEmployee.save();

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

module.exports = {
  getAllEmployees,
  addEmployee,
};
