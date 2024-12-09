const { where, DATEONLY } = require("sequelize");
const db = require("../Models");

const LeaveTypesController = {
  submitLeaveTypes: async (req, res) => {
    try {
      const {
        leave_type_name,
        leave_description,
        allowed_leaves,
        assign_year,
      } = req.body;
      const currentYear = parseInt(assign_year);

      const assignYearStart = `${currentYear}-04-01`;
      const assignYearEnd = `${currentYear + 1}-03-31`;

      const assigned_year = `${assignYearStart} - ${assignYearEnd}`;

      const newLeaveType = await db.leavetypes.create({
        leave_type_name,
        leave_description,
        allowed_leaves,
        assign_year: assigned_year,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.status(201).json(newLeaveType);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllLeaveTypes: async (req, res) => {
    try {
      const leaveTypes = await db.leavetypes.findAll({
        where: { deletedAt: null },
      });
      return res.status(200).json(leaveTypes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getLeaveTypeById: async (req, res) => {
    try {
      const { id } = req.params;
      const leaveType = await db.leavetypes.findOne({
        where: { leave_type_id: id, deletedAt: null },
      });
      if (!leaveType) {
        return res.status(404).json({ error: "Leave Type not found" });
      }
      return res.status(200).json(leaveType);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateLeaveType: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        leave_type_name,
        leave_description,
        allowed_leaves,
        assign_year,
      } = req.body;
      const leaveType = await db.leavetypes.findOne({
        where: { leave_type_id: id, deletedAt: null },
      });
      if (!leaveType) {
        return res.status(404).json({ error: "Leave Type not found" });
      }
      const updatedLeaveType = await leaveType.update({
        leave_type_name,
        leave_description,
        allowed_leaves,
        assign_year,
        updatedAt: new Date(),
      });
      return res.status(200).json(updatedLeaveType);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteLeaveType: async (req, res) => {
    try {
      const { id } = req.params;
      const leaveType = await db.leavetypes.findOne({
        where: { leave_type_id: id, deletedAt: null },
      });
      if (!leaveType) {
        return res.status(404).json({ error: "Leave Type not found" });
      }
      await leaveType.destroy();
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getLeaveTypesDetails: async (req, res) => {
    try {
      // const currentYear = 2023;
      // const leaveTypeDetails = await db.leavetypes.findAll()
      // ({
      //   where: { assign_year: currentYear },
      // });
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "desc";
      const currentYear = parseInt(req.query.year) || new Date().getFullYear(); // Get the year from query parameter or use the current year

      // console.log('Current Year:', currentYear);
      const assignYearStart = `${currentYear}-04-01`;
      const assignYearEnd = `${currentYear + 1}-03-31`;

      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["leave_type_name"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["asc"];

      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "asc").toUpperCase(),
      ]);

      const leaveTypeDetails = await db.leavetypes.findAndCountAll({
        where: {
          assign_year: `${assignYearStart} - ${assignYearEnd}`,
          deletedAt: null,
        },
        order: orderClause,
        limit: limit,
        offset: offset,
      });
      return res.status(200).json({
        totalCount: leaveTypeDetails.count,
        totalPages: Math.ceil(leaveTypeDetails.count / limit),
        currentPage: page,
        data: leaveTypeDetails.rows,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = LeaveTypesController;
