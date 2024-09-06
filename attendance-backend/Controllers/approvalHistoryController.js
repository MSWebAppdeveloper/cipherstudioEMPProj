const db = require("../Models");
const LeaveRequestController = require("./leaveRequestController");
const connectedUsers = require("../server");
let io; // Declare io variable at the top

const nodemailer = require("nodemailer");
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

// Function to set io
const setIo = (socketIo) => {
  io = socketIo;
};
const approvalHistoryController = {
  setIo: setIo,

  createApprovalHistory: async (req, res) => {
    try {
      const { leave_request_id, approver_id, response, comments } = req.body;
      // Get the name of the approver
      const approver = await db.CreateUser.findByPk(approver_id);

      const approvalHistory = await db.approvalHistory.create({
        leave_request_id,
        approver_id,
        response,
        comments,
      });

      // Update the status of the leave request to "Approved"
      await LeaveRequestController.updateLeaveRequestStatus(approvalHistory.id);

      // Get the user who requested leave
      const leaveRequest = await db.leaveRequest.findByPk(leave_request_id, {
        include: [db.CreateUser],
      });
      console.log("leave Request", leaveRequest);
      console.log("approver", approver);
      const recipientEmail = leaveRequest.CreateUser.email;
      const userEmail = leaveRequest.CreateUser.email;
      const emailContentToUser = `
        <p>Hello ${leaveRequest.userName},</p>
        <p>Your leave request has been ${response} by ${approver.name}.</p>
        <p>To view your leave history, go to your portal and view "Leave Request" section or <a href="http://192.168.1.3/employee/leaveRequest">Click Here</a>.</p>
      `;

      // Send email to user
      sendEmail(
        recipientEmail,
        `Leave Request ${response}`,
        emailContentToUser
      );

      // Send email to management
      const managementEmail = "thecipherstudio007@gmail.com"; // Replace with actual management email
      const emailContentToManagement = `
        <p>Hello Management,</p>
        <p>A new leave request has been ${response} by ${approver.name}.</p>
        <p>Check all Leave Applications, go to your portal and view "Leaves" section or <a href="http://192.168.1.3/admin/leaveApplications">Click Here</a>.</p>
      `;

      // Send email to management
      sendEmail(
        managementEmail,
        `New Leave Request ${response}`,
        emailContentToManagement
      );

      if (!leaveRequest || !leaveRequest.CreateUser) {
        console.error("Leave request or user not found");
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Send a notification to the user
      const notificationLog = await db.notificationLog.create({
        recipient_UserId: leaveRequest.UserId, ///
        notification_type: "status_update",
        approver_id: approvalHistory.approver_id, ///
        message_content: `Your leave request has been ${response} by ${approver.userName}.`,
      });
      // Emit a notification event for real-time communication
      // if (io) {
      //     // Emitting only to the logged-in user
      //     io.emit('notification', { userId: notificationLog.recipient_UserId, message: 'Leave request status updated' });
      // }
      // Get the recipient's user ID
      const recipientUserId = leaveRequest.UserId; // replace with your logic to get recipient ID

      // Get the recipient's socket ID using the in-memory store
      const recipientSocketId = connectedUsers[recipientUserId];

      if (recipientSocketId) {
        // If socket ID is available, emit to the specific user
        io.to(recipientSocketId).emit("notification", {
          userId: recipientUserId,
          message: `Your leave request has been ${response} by ${approver.userName}.`,
        });
        console.log("Notification sent to:", recipientUserId);
      } else {
        // Handle cases where the socket ID is unavailable (e.g., user not online)
        console.log("Recipient socket ID not found for user:", recipientUserId);
      }

      return res.status(201).json(approvalHistory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllApprovalHistory: async (req, res) => {
    try {
      const approvalHistory = await db.approvalHistory.findAll();
      return res.status(200).json(approvalHistory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getApprovalHistoryById: async (req, res) => {
    try {
      const approvalHistoryId = req.params.id;
      const approvalHistory = await db.approvalHistory.findByPk(
        approvalHistoryId
      );
      if (!approvalHistory) {
        return res
          .status(404)
          .json({ error: "Approval history entry not found" });
      }
      return res.status(200).json(approvalHistory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateApprovalHistory: async (req, res) => {
    try {
      const approvalHistoryId = req.params.id;
      const { leave_request_id, approver_id, response, comments } = req.body;
      const approvalHistory = await db.approvalHistory.findByPk(
        approvalHistoryId
      );
      if (!approvalHistory) {
        return res.status(404).json({ error: "Approval history not found" });
      }
      await approvalHistory.update({
        leave_request_id,
        approver_id,
        response,
        comments,
      });
      return res.status(200).json(approvalHistory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteApprovalHistory: async (req, res) => {
    try {
      const approvalHistoryId = req.params.id;
      const approvalHistory = await db.approvalHistory.findByPk(
        approvalHistoryId
      );
      if (!approvalHistory) {
        return res.status(404).json({ error: "Approval history not found" });
      }
      await approvalHistory.destroy();
      return res
        .status(200)
        .json({ message: "Approval history deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = approvalHistoryController;
