const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', employeeController.addEmployee);
router.get('/employees/search/:query', employeeController.searchEmployee);

module.exports = router;
