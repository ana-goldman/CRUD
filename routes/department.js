const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/departments', departmentController.getAllDepartments);
router.get('/departments/:name', departmentController.getDepartmentById);
router.post('/departments', departmentController.addDepartment);
router.put('/departments/:name', departmentController.updateDepartment);

module.exports = router;
