const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  employees: [
    {
      name: String,
      surname: String,
    },
  ],
});

module.exports = mongoose.model('Department', departmentSchema);
