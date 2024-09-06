const { Op } = require("sequelize");
const db = require("../Models");

const ProjectController = {
  createProject: async (req, res) => {
    try {
      const { projectName, assignedTo, createdBy } = req.body;
      const newProject = await db.Project.create({
        projectName,
        assignedTo,
        createdBy,
      });
      return res.status(201).json(newProject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllProject: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "desc";
      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["projectName"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["asc"];

      const userName = req.query.userName;
      const userRole = req.query.userRole;

      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "asc").toUpperCase(),
      ]);

      const whereClause = {
        deletedAt: null,
      };

      // If the user is an employee, filter projects assigned to them
      if (userRole === "Employee" && userName) {
        whereClause.assignedTo = { [Op.contains]: [userName] }; // Using Sequelize's Op.contains
      }

      const Projects = await db.Project.findAndCountAll({
        where: whereClause,
        order: orderClause,
        limit: limit,
        offset: offset,
      });

      return res.status(200).json({
        totalCount: Projects.count,
        totalPages: Math.ceil(Projects.count / limit),
        currentPage: page,
        data: Projects.rows,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      const Projects = await db.Project.findOne({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      if (!Projects) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(200).json(Projects);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { projectName, assignedTo } = req.body;
      const Projects = await db.Project.findByPk(id);
      if (!Projects) {
        return res.status(404).json({ error: "Project not found" });
      }
      const updatedProject = await Projects.update({
        projectName,
        assignedTo,
      });
      return res.status(200).json(updatedProject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      const Projects = await db.Project.findByPk(id);
      if (!Projects) {
        return res.status(404).json({ error: "Project not found" });
      }
      await Projects.destroy();
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ProjectController;
