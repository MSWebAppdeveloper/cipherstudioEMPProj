const db = require("../Models");
const moment = require("moment");
const { format } = require("date-fns");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const { where } = require("sequelize");
// Function to send email
async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}:`, info.response);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
}

const LeaveRequestController = {
  createLeaveRequest: async (req, res) => {
    try {
      const { UserId, leaveType, startDate, endDate, reason, userName } =
        req.body;

      // Check if the end date is not lesser than the start date
      if (moment(endDate).isBefore(startDate)) {
        return res
          .status(400)
          .json({ error: "End date cannot be before the start date" });
      }

      // Calculate the number of days taken for each leave type
      const start = moment(startDate, "YYYY-MM-DD");
      const end = moment(endDate, "YYYY-MM-DD");
      const daysTaken = end.diff(start, "days") + 1; // Add 1 to include both start and end dates
      const leaves = await db.leavetypes.findOne({
        where: { leave_type_id: leaveType },
      });
      const leaveRequest = await db.leaveRequest.create({
        UserId,
        leaveType: leaves.leave_type_name,
        startDate,
        endDate,
        reason,
        userName,
        total_days: daysTaken,
        leave_type_id: leaves.leave_type_id,
      });
      const user = await db.CreateUser.findByPk(UserId);
      const userEmail = user.email;
      const userHtmlContent = `
        <p>Hello ${userName},</p>
        <p>Your leave request has been submitted successfully.</p>
        <p>Leave Type: ${leaveRequest.leaveType}</p>
        <p>Start Date: ${startDate}</p>
        <p>End Date: ${endDate}</p>
        <p>Reason: ${reason}</p>
        <p>Number of Days: ${daysTaken}</p>
        <p>Status: Pending</p>
        <p>To view your leave history, go to your portal and view "Leave Request" section or  <a href="http://192.168.1.50/employee/leaveRequest">Click Here</a>. </p> 
      `;

      sendEmail(userEmail, "Leave Request Submitted", userHtmlContent);

      // Email to management
      const managementEmail = "thecipherstudio007@gmail.com"; // Replace with actual management email
      const managementHtmlContent = `
        <p>Hello Management,</p>
        <p>A new leave request has been submitted by ${userName}.</p>
        <p>Leave Type: ${leaveRequest.leaveType}</p>
        <p>Start Date: ${startDate}</p>
        <p>End Date: ${endDate}</p>
        <p>Reason: ${reason}</p>
        <p>Number of Days: ${daysTaken}</p>
        <p>User Email: ${userEmail}</p>
        <p>Status: Pending</p>
        <p>To response this request, go to your portal and view "Leaves" section or  <a href="http://192.168.1.50/admin/leaveApplications">Click Here</a>. </p> 
      `;

      sendEmail(managementEmail, "New Leave Request", managementHtmlContent);

      return res.status(201).json(leaveRequest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllLeaveRequests: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "desc";
      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["createdAt"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["desc"];
      const statusFilter = req.query.status || null;
      const nameFilter = req.query.name || null;
      const forDownload = req.query.forDownload === "true";

      // Construct order clause
      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "desc").toUpperCase(),
      ]);

      // Build the where clause for filtering by status and name
      const whereClause = {
        ...(statusFilter && { status: statusFilter }),
        ...(nameFilter && { userName: { [Op.like]: `%${nameFilter}%` } }),
      };

      // Handle download request
      if (forDownload) {
        const leaveRequests = await db.leaveRequest.findAll({
          where: whereClause,
          order: [["createdAt", "DESC"]],
        });
        const formattedDowanloadData = leaveRequests.map((request) => ({
          ...request.toJSON(),
          createdAt: format(
            new Date(request.createdAt),
            "MMMM do, yyyy, h:mm:ss a"
          ),
        }));
        const downloadData = formattedDowanloadData.map((request) => ({
          id: request.id,
          userName: request.userName,
          leaveType: request.leaveType,
          createdAt: request.createdAt,
          startDate: request.startDate,
          total_days: request.total_days,
          reason: request.reason,
          status: request.status,
          // Add other fields as needed for download
        }));
        // console.log(downloadData);
        return res.status(200).json(downloadData);
      }

      // Fetch leave requests
      const leaveRequests = await db.leaveRequest.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause,
      });

      // Format the createdAt field for each leave request
      const formattedData = leaveRequests.rows.map((request) => ({
        ...request.toJSON(),
        createdAt: format(
          new Date(request.createdAt),
          "MMMM do, yyyy, h:mm:ss a"
        ),
      }));
      // console.log(formattedData);
      return res.status(200).json({
        totalCount: leaveRequests.count,
        totalPages: Math.ceil(leaveRequests.count / limit),
        currentPage: page,
        data: formattedData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getLeaveRequestById: async (req, res) => {
    try {
      const UserId = req.params.id;
      // const UserId = req.user?.id;

      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "desc";
      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["createdAt"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["desc"];

      // Sorting order clause
      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "desc").toUpperCase(),
      ]);

      // Status filter (optional)
      const statusFilter = req.query.status || null;

      const whereClause = {
        UserId,
        ...(statusFilter && { status: statusFilter }),
      };
      // Query to fetch leave request by ID with optional pagination and status filter
      const leaveRequest = await db.leaveRequest.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause,
      });
      // console.log(leaveRequest);
      if (!leaveRequest) {
        return res.status(404).json({ error: "Leave request not found" });
      }

      // Format data as needed
      const formattedData = leaveRequest.rows.map((request) => ({
        ...request.toJSON(),
        createdAt: format(
          new Date(request.createdAt),
          "MMMM do, yyyy, h:mm:ss a"
        ),
      }));

      // Response object with paginated data
      const response = {
        data: formattedData,
        totalCount: leaveRequest.count,
        totalPages: Math.ceil(leaveRequest.count / limit),
        currentPage: page,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getLeaveHistoryByUserId: async (req, res) => {
    try {
      // console.log("id-------------", req.params.id);
      const userId = req.params.id;
      const leaveHistory = await db.leaveRequest.findAll({
        where: { UserId: userId },
      });
      return res.status(200).json(leaveHistory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getLeaveOverview: async (req, res) => {
    try {
      // Calculate leave overview data here
      const leaveOverview = await db.leaveOverview.findOne();
      return res.status(200).json(leaveOverview);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateLeaveRequest: async (req, res) => {
    try {
      const leaveRequestId = req.params.id;
      const {
        UserId,
        leaveType,
        startDate,
        endDate,
        reason,
        status,
        userName,
        leave_type_id,
      } = req.body;
      const leaveRequest = await db.leaveRequest.findByPk(leaveRequestId);
      if (!leaveRequest) {
        return res.status(404).json({ error: "Leave request not found" });
      }
      await leaveRequest.update({
        UserId,
        leaveType,
        startDate,
        endDate,
        reason,
        status,
        userName,
        leave_type_id,
      });
      return res.status(200).json(leaveRequest);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteLeaveRequest: async (req, res) => {
    try {
      const leaveRequestId = req.params.id;
      const leaveRequest = await db.leaveRequest.findByPk(leaveRequestId);
      if (!leaveRequest) {
        return res.status(404).json({ error: "Leave request not found" });
      }
      await leaveRequest.destroy();
      return res
        .status(200)
        .json({ message: "Leave request deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  autoDeleteLeaves: async () => {
    try {
      const currentDate = new Date();
      const midnight = new Date(currentDate);
      midnight.setHours(0, 0, 0, 0); // Set time to midnight
      const leaveRequest = await db.leaveRequest.findAll({
        where: {
          status: "Pending",
          startDate: {
            [db.Sequelize.Op.lt]: midnight,
          },
        },
      });

      for (const leaves of leaveRequest) {
        if (currentDate > leaves.startDate && leaves.status === "Pending") {
          await leaves.destroy();
        }
      }
    } catch (error) {}
  },

  updateLeaveRequestStatus: async (approvalHistoryId) => {
    try {
      // Find the approval history entry
      const approvalHistory = await db.approvalHistory.findByPk(
        approvalHistoryId,
        { include: [db.leaveRequest] }
      );
      if (!approvalHistory) {
        console.error("Approval history entry not found");
        return;
      }

      // Update the status of the associated leave request based on the response
      const leaveRequest = approvalHistory.LeaveRequest;
      if (!leaveRequest) {
        console.error("Associated leave request not found");
        return;
      }

      // Determine the status based on the response
      let status = "Pending"; // Default status if response is neither 'Approved' nor 'Rejected'
      if (approvalHistory.response === "Approved") {
        status = "Approved";
      } else if (approvalHistory.response === "Rejected") {
        status = "Rejected";
      }

      // Update the status
      await leaveRequest.update({ status });

      // Create a notification log entry
      // const notificationLog = await db.notificationLog.create({
      //   recipient_UserId: leaveRequest.UserId, // Assuming UserId corresponds to the email of the user
      //   notification_type: 'status_update',
      //   message_content: `Leave request ${leaveRequest.id} has been ${status}.`,
      // });

      console.log("Leave request status updated successfully");
    } catch (error) {
      console.error("Error updating leave request status:", error);
    }
  },
};

module.exports = LeaveRequestController;
