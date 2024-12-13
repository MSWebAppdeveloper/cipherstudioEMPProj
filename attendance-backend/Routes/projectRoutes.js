const express = require("express");
const router = express.Router();
const projectController = require("../Controllers/projectController");

// Create a new leave type
router.post("/project", projectController.createProject);

// Get details of leave types based on a specific year
router.get("/project", projectController.getAllProject);

// Get a specific leave type by ID
router.get("/project/:id", projectController.getProjectById);

// Update a specific leave type by ID
router.put("/project/:id", projectController.updateProject);

// Delete a specific leave type by ID
router.delete("/project/:id", projectController.deleteProject);

module.exports = router;
