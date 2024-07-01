const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/departments', departmentController.getAllDepartments);
router.get('/departments/:name', departmentController.getDepartmentByName);
router.post('/departments', departmentController.addDepartment);
router.put('/departments/:id', departmentController.updateDepartmentById);

module.exports = router;
