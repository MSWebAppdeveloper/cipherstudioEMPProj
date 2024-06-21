const express = require('express');
const router = express.Router();
const leaveTypesController = require('../Controllers/leaveTypesController');

// Create a new leave type
router.post('/', leaveTypesController.submitLeaveTypes);

// Get details of leave types based on a specific year
router.get('/', leaveTypesController.getLeaveTypesDetails);

// Get all leave types
router.get('/details', leaveTypesController.getAllLeaveTypes);

// Get a specific leave type by ID
router.get('/:id', leaveTypesController.getLeaveTypeById);

// Update a specific leave type by ID
router.put('/:id', leaveTypesController.updateLeaveType);

// Delete a specific leave type by ID
router.delete('/:id', leaveTypesController.deleteLeaveType);

module.exports = router;