require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { sequelize } = require("../Models/index");
const { format } = require("date-fns");
const { where } = require("sequelize");

// Function to generate a random password
function generateRandomPassword() {
  return Math.random().toString(36).slice(-8);
}

const UserController = {
  createUser: async (req, res) => {
    try {
      const { name, email, department, userRole, shift } = req.body;

      // Check if the email is already used for the given user role
      const existingUser = await db.CreateUser.findOne({
        where: { name, email, userRole },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email already in use for this role" });
      }

      const password = generateRandomPassword();
      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Define different email content and subject based on userRole
      let emailContent, subject;
      if (userRole === "Management") {
        emailContent = `
          <p>Hello ${name},</p>
          <p>Welcome to the Management Application!</p>
          <p>Your account has been created successfully.</p>
          <p>Email: ${email}</p>
          <p>Password: ${password}</p>
          <p>Please click <a href="http://192.168.1.8/login">here</a> to log in.</p>
        `;
        subject = "Invitation to the Management Application";
      } else if (userRole === "Employee") {
        emailContent = `
          <p>Hello ${name},</p>
          <p>Welcome to the Employee Application!</p>
          <p>Your account has been created successfully.</p>
          <p>Email: ${email}</p>
          <p>Password: ${password}</p>
          <p>Please click <a href="http://192.168.1.8/login">here</a> to log in.</p>
        `;
        subject = "Invitation to the Employee Application";
      } else {
        return error;
      }

      // Send email with user details
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
        to: email,
        subject,
        html: emailContent,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          // If email sent successfully, save user data to database
          try {
            let departmentValue = department || "----";
            let isActive = true;
            const user = await db.CreateUser.create({
              name,
              email,
              department: departmentValue,
              password: hashedPassword,
              userRole,
              isActive,
              shift,
            });

            return res.status(201).json(user);
          } catch (error) {
            console.error(error);
            return res
              .status(500)
              .json({ error: "Internal Server Error while saving user" });
          }
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUsers: async (req, res) => {
    try {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "asc";

      // Sorting parameters
      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["name"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["asc"];

      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "desc").toUpperCase(),
      ]);

      // Fetch users with the role 'Employee'
      const users = await db.CreateUser.findAll({
        where: {
          userRole: "Employee", // Filtering condition
        },
        order: orderClause,
        // limit: limit, // Limit the number of results per page
        offset: offset, // Skip the results for previous pages
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "asc";
      const shift = ["Day", "Night", "Hybrid"];

      const sortColumns = req.query.sortColumn
        ? req.query.sortColumn.split(",")
        : ["name"];
      const sortOrders = req.query.sortOrder
        ? req.query.sortOrder.split(",")
        : ["desc"];

      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "desc").toUpperCase(),
      ]);

      const roleFilter = req.query.userRole || null;
      const isActive = req.query.isActive === "true";

      // Build the where clause for filtering by status
      const whereClause = {
        ...(roleFilter && { userRole: roleFilter }),
        isActive: isActive,
      };
      const users = await db.CreateUser.findAndCountAll({
        where: whereClause,
        // limit: parseInt(limit),
        offset: parseInt(offset),
        order: orderClause,
      });
      return res.status(200).json({
        totalCount: users.count,
        totalPages: Math.ceil(users.count / limit),
        currentPage: parseInt(page),
        data: users.rows,
        shift: shift,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserDetails: async (req, res) => {
    try {
      const UserId = req.user?.id;

      if (!UserId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "desc";
      const sortColumns = req.query.sortColumn ? req.query.sortColumn.split(",") : ["createdAt"];
      const sortOrders = req.query.sortOrder ? req.query.sortOrder.split(",") : ["desc"];
      const statusFilter = req.query.status || null;

      const orderClause = sortColumns.map((col, index) => [
        col,
        (sortOrders[index] || "desc").toUpperCase(),
      ]);

      const whereClause = {
        UserId,
        ...(statusFilter && { status: statusFilter }),
      };

      const user = await db.CreateUser.findOne({ where: { id: UserId } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const attendanceDetails = await sequelize.query(
        `
          SELECT * FROM public."CreateUsers" c
          JOIN public."Attendances" a ON c.id = a."UserId" 
          WHERE c.id = :userId;
        `,
        { replacements: { userId: UserId }, type: sequelize.QueryTypes.SELECT }
      );

      const additionalDetails = await sequelize.query(
        `
          SELECT * FROM public."CreateUsers" c
          JOIN public."Profiles" p ON c.id = p."UserId" 
          WHERE c.id = :userId;
        `,
        { replacements: { userId: UserId }, type: sequelize.QueryTypes.SELECT }
      );

      const leaveRequestDetails = await db.leaveRequest.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: orderClause,
      });

      const formattedData = leaveRequestDetails.rows.map((request) => ({
        ...request.toJSON(),
        createdAt: format(new Date(request.createdAt), "MMMM do, yyyy, h:mm:ss a"),
      }));

      const currentYear = parseInt(req.query.year) || new Date().getFullYear();
      const assignYearStart = `${currentYear}-04-01`;
      const assignYearEnd = `${currentYear + 1}-03-31`;

      const leaveBalance = await sequelize.query(
        `
          SELECT
            lt."leave_type_name" AS "leaveType",
            lt."allowed_leaves" AS "allowedLeaves",
            lt."assign_year" AS "assign_year",
            SUM(CASE WHEN lr."status" = 'Approved' THEN lr."total_days" ELSE 0 END) AS "totalTakenLeave",
            SUM(CASE WHEN lr."status" = 'Pending' THEN lr."total_days" ELSE 0 END) AS "pendingLeaves",
            GREATEST(lt."allowed_leaves" - SUM(CASE WHEN lr."status" = 'Approved' THEN lr."total_days" ELSE 0 END), 0) AS "leavesLeft",
            CASE
              WHEN SUM(CASE WHEN lr."status" = 'Approved' THEN lr."total_days" ELSE 0 END) > lt."allowed_leaves" 
              THEN SUM(CASE WHEN lr."status" = 'Approved' THEN lr."total_days" ELSE 0 END) - lt."allowed_leaves"
              ELSE 0
            END AS "extraTakenLeaves"
          FROM
            public."LeaveTypes" lt
          LEFT JOIN
            public."LeaveRequests" lr ON lt."leave_type_id" = lr."leave_type_id" AND lr."UserId" = :userId
          WHERE
            lt."assign_year" BETWEEN :assignYearStart AND :assignYearEnd
          GROUP BY
            lt."leave_type_name", lt."allowed_leaves", lt."assign_year";
        `,
        {
          replacements: {
            userId: UserId,
            assignYearStart,
            assignYearEnd,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      const mergedDetails = {
        ...user.toJSON(),
        ...additionalDetails[0],
        attendance: attendanceDetails,
        leaveRequests: {
          data: formattedData,
          totalCount: leaveRequestDetails.count,
          totalPages: Math.ceil(leaveRequestDetails.count / limit),
          currentPage: page,
        },
        leaveBalance,
      };

      return res.status(200).json([mergedDetails]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const UserId = req.params.id;
      const user = await db.CreateUser.findOne({ where: { id: UserId } });
      const attendanceDetails = await sequelize.query(
        `
              SELECT * FROM public."CreateUsers" c
              JOIN public."Attendances" a ON c.id = a."UserId" WHERE c.id = :userId;
          `,
        { replacements: { userId: UserId }, type: sequelize.QueryTypes.SELECT }
      );
      const calendarReport = await sequelize.query(
        `
              SELECT * FROM public."CreateUsers" c
              JOIN public."Attendances" a ON c.id = a."UserId" WHERE c.id = :userId;
          `,
        { replacements: { userId: UserId }, type: sequelize.QueryTypes.SELECT }
      );
      console.log(attendanceDetails)
      // Fetch leave request details
      const leaveRequestDetails = await sequelize.query(
        `
              SELECT * FROM public."CreateUsers" c
              JOIN public."LeaveRequests" l ON c.id = l."UserId" WHERE c.id = :userId;
        `,
        { replacements: { userId: UserId }, type: sequelize.QueryTypes.SELECT }
      );

       // Fetch grace rules
    const rules = await db.RulesForCalendar.findOne({ where: { ruleName: 'Grace' } });
    const graceTime = rules?.graceTime || 0; // Default to 0 if no grace rule exists
    const allowedCount = rules?.allowedCount || 0;

    const monthlyGraceCount = {};
    // Process calendar data
    const updatedCalendarReport = calendarReport.map(entry => {
      const entryDate = new Date(entry.date); // Parse entry date
  const entryMonth = `${entryDate.getFullYear()}-${entryDate.getMonth() + 1}`; // e.g., "2024-10"

  if (!monthlyGraceCount[entryMonth]) {
    monthlyGraceCount[entryMonth] = 0; // Initialize grace count for the month
  }
      if (entry.status === 'Short Leave') { // Check if the status is 'Short Leave'
        let totalHoursWithGrace = parseFloat(entry.totalHours) + graceTime / 60; // Convert grace time to hours
        if (totalHoursWithGrace >= 9 && monthlyGraceCount[entryMonth] < allowedCount) {
          monthlyGraceCount[entryMonth]++;
          return {
            ...entry,
            status: 'Full Day', // Update status to 'Full Day'
            comment: `Grace time of ${graceTime} minutes applied.`, // Add comment about grace time
          };
        }
    }
      return entry; // Retain the original entry for other statuses
    });


      const mergedDetails = {
        ...user.toJSON(),
        attendance: attendanceDetails,
        leaveRequests: leaveRequestDetails,
        calendarReport: updatedCalendarReport,
      };
      // console.log("merged details", mergedDetails);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json([mergedDetails]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, department, shift } = req.body;
      const user = await db.CreateUser.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.update({ name, department, shift });
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserDetails: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await db.CreateUser.findByPk(userId);
      if (!user) return res.status(404).send("User not found");
      const { designation, phoneNumber, country, state, city, address, shift } =
        req.body;
      user.designation = designation;
      user.phoneNumber = phoneNumber;
      user.country = country;
      user.state = state;
      user.city = city;
      user.address = address;
      user.shift = shift;
      await db.CreateUser.save();
      return res.status(200).send(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  },
  updateUserStatus: async (req, res) => {
    try {
      const userId = req.params.id;
      const { isActive } = req.body;
      const user = await db.CreateUser.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.update({ isActive });
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await db.CreateUser.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.destroy();
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.CreateUser.findOne({ where: { email } });
      // console.log(user);
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).send("Authentication failed");

      if (!user.isActive)
        return res
          .status(403)
          .send("User is not active. Please contact the administrator.");

      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          userRole: user.userRole,
          shift: user.shift,
        },
        process.env.secretKey,
        { expiresIn: "12h" }
      );
      const refreshToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          userRole: user.userRole,
          shift: user.shift,
        },
        process.env.refreshTokenSecret
      );
      return res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
        UserId: user.id,
        userRole: user.userRole,
        shift: user.shift,
      });
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  },
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).send("Refresh Token not provided");
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.refreshTokenSecret);
      const user = await db.CreateUser.findByPk(decoded.id);
      if (!user) {
        return res.status(403).send("Invalid Refresh Token");
      }

      const newAccessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          userRole: user.userRole,
        },
        process.env.secretKey,
        { expiresIn: "1m" }
      );

      return res.status(200).send({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(403).send("Invalid Refresh Token");
    }
  },    
};


module.exports = UserController;
