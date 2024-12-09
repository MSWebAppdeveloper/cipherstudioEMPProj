const db = require("../Models");
const { format } = require("date-fns");
const { Op } = require("sequelize");
const multer= require("multer")
const formatTime = (decimalMinutes) => {
  const totalMinutes = Math.floor(decimalMinutes * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor((decimalMinutes * 60) % 60);
  const remainingSeconds = Math.round(((decimalMinutes * 60) % 1) * 60);

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  } else if (minutes > 0) {
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  } else {
    return `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  }
};
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
const TaskController = {
  createTask: async (req, res) => {
    try {
      const {
        UserId,
        userName,
        projectName,
        title,
        description,
        status,
        estimatedTime,
        takenTime,
        comments,
        assignedTo,
        createdBy,
      } = req.body;
      let file = null;
      if (req.file) {
        file = req.file.buffer; // Get the file buffer
      }
console.log("file",req.body)
// console.log("buffer",req.file.buffer)
      if (status === "Completed" && !takenTime) {
        return res.status(400).json({
          error: "Time taken is required to mark the task as completed",
        });
      }
      let defaultStatus = "Recently Added";
      const task = await db.Task.create({
        UserId,
        userName,
        projectName,
        title,
        description,
        status: defaultStatus,
        estimatedTime,
        takenTime,
        comments,
        assignedTo,
        createdBy,
        file,
      });

      return res.status(201).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["createdAt"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["desc"];

      const startDate = req.query.startDate
        ? new Date(req.query.startDate)
        : null;
      const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

      const statusFilter = req.query.status || null;
      const nameFilter = req.query.name || null;
      const forDownload = req.query.forDownload === "true";
      // Extract client-side sorting parameters
      const clientSortColumn = req.query.clientSortColumn || "createdAt";
      const clientSortOrder = req.query.clientSortOrder || "desc";

      const whereClause = {
        ...(statusFilter && { status: statusFilter }),
        ...(nameFilter && { userName: { [Op.like]: `%${nameFilter}%` } }),
        ...(startDate &&
          endDate && {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }),
      };

      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "desc").toUpperCase(),
      ]);

      if (forDownload) {
        const downloadReports = await db.Task.findAll({
          where: whereClause,
          order: [[clientSortColumn, clientSortOrder.toUpperCase()]],
        });
        const reports = downloadReports.map((task) => ({
          id: task.id,
          UserId: task.UserId,
          projectName: task.projectName,
          title: task.title,
          userName: task.userName,
          assignedTo: task.assignedTo,
          estimatedTime: task.estimatedTime,
          status: task.status,
          takenTime: formatTime(task.takenTime),
          createdAt: formatTime(task.createdAt),
          description: task.description,
          createdAt: task.createdAt,
          comments: task.comments,
        }));

        return res.status(200).json(reports);
      }

      const tasks = await db.Task.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause,
      });

      const formattedData = tasks.rows.map((task) => ({
        ...task.toJSON(),
        createdAt: format(new Date(task.createdAt), "MMMM do, yyyy, h:mm:ss a"),
        takenTime: task.takenTime ? formatTime(task.takenTime) : null,
      }));

      return res.status(200).json({
        totalCount: tasks.count,
        totalPages: Math.ceil(tasks.count / limit),
        currentPage: page,
        data: formattedData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const UserId = parseInt(req.params.id);
      const userName = req.query.userName;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const userRole = req.query.userRole;
      const offset = (page - 1) * limit;
      const order = req.query.order || "desc";
      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["createdAt"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["desc"];
      const statusFilter = req.query.status || null;

      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "desc").toUpperCase(),
      ]);

      const whereClause = {
        [Op.or]: [
          { UserId },
          db.Sequelize.literal(`'${userName}' = ANY("assignedTo")`),
        ],
        ...(statusFilter && { status: statusFilter }),
      };
      const tasks = await db.Task.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause,
      });

      if (!tasks) {
        return res.status(404).json({ error: "Task not found" });
      }

      const taskData = tasks.rows.map((task) => ({
        ...task.toJSON(),
        createdAt: format(new Date(task.createdAt), "MMMM do, yyyy, h:mm:ss a"),
        takenTime: task.takenTime ? formatTime(task.takenTime) : null,
      }));

      return res.status(200).json({
        totalCount: tasks.count,
        totalPages: Math.ceil(tasks.count / limit),
        currentPage: page,
        data: taskData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const {
        UserId,
        userName,
        projectName,
        title,
        description,
        status,
        takenTime,
        estimatedTime,
        comments,
        assignedTo,
        file,
      } = req.body;
      const task = await db.Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (status === "Completed" && !takenTime) {
        return res.status(400).json({
          error: "Time taken is required to mark the task as completed",
        });
      }

      const updateData = {
        UserId,
        userName,
        projectName,
        title,
        description,
        status,
        takenTime,
        estimatedTime,
        comments,
        assignedTo,
        file,
      };

      if (status === "In Progress") {
        updateData.startTime = new Date();
      }

      await task.update(updateData);

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const task = await db.Task.findByPk(taskId);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      await task.destroy();
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  logTaskHistory: async (
    taskId,
    { status, startTime, holdTime, resumeTime, comments, totalSpentTime }
  ) => {
    try {
      const task = await db.Task.findByPk(taskId);
      if (!task) throw new Error("Task not found");

      await db.TaskHistory.create({
        UserId: task.UserId,
        projectName: task.projectName,
        TaskId: task.id,
        status,
        startTime,
        holdTime,
        resumeTime,
        comments,
        totalSpentTime,
      });
    } catch (error) {
      console.error("Error logging task history:", error);
    }
  },

  startTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const { status } = req.body;

      const task = await db.Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (status !== "In Progress") {
        return res.status(400).json({ error: "Invalid status update" });
      }

      const updateData = {
        status,
        startTime: new Date(),
        holdTime: null,
        resumeTime: null,
      };

      await task.update(updateData);
      await TaskController.logTaskHistory(taskId, {
        status: "Start", // Log "Start" status here
        startTime: updateData.startTime,
      });

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  holdTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const comments = req.body.comment;
      const { status } = req.body;

      if (status !== "Hold") {
        return res.status(400).json({ error: "Invalid status update" });
      }

      const task = await db.Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      const endTime = new Date();

      // Fetch the last resume entry
      const lastResumeEntry = await db.TaskHistory.findOne({
        where: { TaskId: taskId, status: "Resume" },
        order: [["resumeTime", "DESC"]],
      });

      let totalSpentTime = 0;

      if (lastResumeEntry) {
        const lastResumeTime = new Date(lastResumeEntry.resumeTime);
        totalSpentTime = (endTime - lastResumeTime) / 3600000; // Time in hours
      } else {
        // If no resume entry, calculate time from task's startTime
        const startTime = task.startTime ? new Date(task.startTime) : endTime;
        totalSpentTime = (endTime - startTime) / 3600000; // Time in hours
      }

      totalSpentTime = parseFloat(totalSpentTime.toFixed(2));

      // Update the task's holdTime and create the hold entry
      const updateData = {
        status,
        holdTime: endTime,
        comments,
      };

      await task.update(updateData);

      // Log the hold entry
      await db.TaskHistory.create({
        TaskId: taskId,
        projectName: task.projectName,
        status,
        UserId: task.UserId,
        holdTime: endTime,
        totalSpentTime: totalSpentTime,
        comments,
      });

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  resumeTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const { status } = req.body;

      const task = await db.Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      if (status !== "In Progress") {
        return res.status(400).json({ error: "Invalid status update" });
      }

      const updateData = {
        status,
      };

      await task.update(updateData);
      await TaskController.logTaskHistory(taskId, {
        status: "Resume", // Log "Resume" status here
        resumeTime: new Date(),
      });

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  endTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const { status } = req.body;

      if (status !== "Completed") {
        return res.status(400).json({ error: "Invalid status update" });
      }

      const task = await db.Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      const endTime = new Date();

      // Fetch the last resume entry
      const lastResumeEntry = await db.TaskHistory.findOne({
        where: { TaskId: taskId, status: "Resume" },
        order: [["resumeTime", "DESC"]],
      });

      let totalSpentTime = 0;

      if (lastResumeEntry) {
        const lastResumeTime = new Date(lastResumeEntry.resumeTime);
        totalSpentTime = (endTime - lastResumeTime) / 3600000; // Time in hours
      } else {
        // If no resume entry, calculate time from task's startTime
        const startTime =new Date(task.startTime);
        totalSpentTime = (endTime - startTime) / 3600000; // Time in hours
      }

      totalSpentTime = parseFloat(totalSpentTime.toFixed(2));

      // Log the completion entry
      await db.TaskHistory.create({
        TaskId: taskId,
        projectName: task.projectName,
        status,
        UserId: task.UserId,
        totalSpentTime: totalSpentTime,
        comments: task.comments,
        endTime: endTime,
      });

      // Calculate the total taken time from TaskHistories
      const taskHistories = await db.TaskHistory.findAll({
        where: { TaskId: taskId },
      });

      const totalTakenTime = taskHistories.reduce((acc, history) => {
        return acc + (history.totalSpentTime || 0);
      }, 0);

      // Update the task's status, endTime, and takenTime
      await task.update({
        status,
        endTime,
        takenTime: totalTakenTime,
      });
      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = TaskController;
