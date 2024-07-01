const Department = require('../models/department');

const getDepartmentIdByName = async (name) => {
  const department = await Department.findOne({
    // case insensitive
    name: { $regex: new RegExp(`^${name}$`, 'i') },
  });
  if (!department) {
    throw new Error('Department not found');
  }
  return department._id;
};

module.exports = { getDepartmentIdByName };
