const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskController");
const db = require("../Models");
const multer = require("multer");

// Set up storage with memory storage (in-memory storage)
const storage = multer.memoryStorage();

const upload = multer();
router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", upload.single("file"), taskController.createTask);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.post("/tasks/:id/start", taskController.startTask);
// Update Task to Completed
router.put("/tasks/:id/end", taskController.endTask);
router.put("/tasks/:id/hold", taskController.holdTask);
router.put("/tasks/:id/resume", taskController.resumeTask);

router.get("/task/:taskId/details", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    // Fetch the task and its history
    const task = await db.Task.findOne({
      where: { id: taskId },
      include: [
        {
          model: db.TaskHistory,
          as: "TaskHistory",
          order: [["createdAt", "asc"]],
        },
      ],
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
