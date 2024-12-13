const { Op } = require("sequelize");
const db = require("../Models");

const AttendanceController = {
  signin: async (req, res) => {
    try {
      const { UserId, timeIn, date, homeActiveStart, homeActiveEnd, shift } =
        req.body;

      // Check if an entry for the given date and UserId already exists
      const existingEntry = await db.Attendance.findOne({
        where: {
          UserId,
          date,
        },
      });

      if (existingEntry) {
        // If an entry already exists for the given date and UserId, return an error
        return res.status(400).json({
          error: "Attendance record already exists for this date and user",
        });
      }
      let homeHours = 0;
      let homeStart = null;
      let homeEnd = null;
      // Calculate home active hours
      if (shift === "Hybrid" && homeActiveStart && homeActiveEnd) {
        homeStart = new Date(`${date} ${homeActiveStart}`);
        homeEnd = new Date(`${date} ${homeActiveEnd}`);

        if (homeEnd < homeStart) {
          // If the home end time is earlier in the day than the home start time, add one day to home end
          homeEnd.setDate(homeEnd.getDate() + 1);
        }

        homeHours = (homeEnd - homeStart) / (1000 * 60 * 60); // Convert milliseconds to hours
      }

      // Save the attendance record to the database using Sequelize model
      const newAttendance = await db.Attendance.create({
        UserId,
        timeIn,
        date,
        homeActiveStart: homeStart ? homeActiveStart : null,
        homeActiveEnd: homeEnd ? homeActiveEnd : null,
        homeHours,
        shift,
        status: "Active", // Set status to "Active" upon sign-in
      });

      res.json(newAttendance);
    } catch (error) {
      console.error("Error adding attendance record:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getStatus: async (req, res) => {
    try {
      const { UserId } = req.query;
      if (!UserId) {
        return res.status(400).json({ error: "UserId is required" });
      }

      const currentDate = new Date().toISOString().split("T")[0];

      const existingEntry = await db.Attendance.findOne({
        where: {
          UserId,
          date: currentDate,
        },
      });
      const isClockedIn = !!existingEntry;
      const attendanceId = existingEntry ? existingEntry.id : null;

      return res.json({ isClockedIn, attendanceId, existingEntry });
    } catch (error) {
      console.error("Error checking attendance status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  signout: async (req, res) => {
    try {
      const { timeOut } = req.body;
      const attendanceId = req.params.id;

      // Update the attendance record in the database using Sequelize model
      const attendance = await db.Attendance.findByPk(attendanceId);
      if (!attendance) {
        return res.status(404).json({ error: "Attendance record not found" });
      }

      const currentDate = new Date();
      const timeIn = attendance.timeIn;
      const signOutTime = timeOut;
      const shift = attendance.shift;
      const date = attendance.date;
      const homeActiveStart = attendance.homeActiveStart;
      const homeActiveEnd = attendance.homeActiveEnd;
      // Combine current date with time strings
      const combinedTimeIn = `${currentDate.toDateString()} ${timeIn}`;
      const combinedSignOutTime = `${currentDate.toDateString()} ${signOutTime}`;

      let timeInDate = new Date(combinedTimeIn);
      let signOutDate = new Date(combinedSignOutTime);

      if (signOutDate < timeInDate) {
        // If the sign-out time is earlier in the day than the time-in time, add one day to sign-out
        signOutDate.setDate(signOutDate.getDate() + 1);
      }

      let officeHours = (signOutDate - timeInDate) / (1000 * 60 * 60); // Convert milliseconds to hours

      // Calculate home active hours
      let homeHours = 0;
      if (homeActiveStart && homeActiveEnd) {
        const homeStart = new Date(`${date} ${homeActiveStart}`);
        const homeEnd = new Date(`${date} ${homeActiveEnd}`);

        if (homeEnd < homeStart) {
          // If the home end time is earlier in the day than the home start time, add one day to home end
          homeEnd.setDate(homeEnd.getDate() + 1);
        }

        homeHours = (homeEnd - homeStart) / (1000 * 60 * 60); // Convert milliseconds to hours
      }

      if (shift === "Hybrid") {
        // If the shift type is hybrid, ensure totalHours is calculated as office hours + home hours
        officeHours += homeHours || 0; // Add home active hours
      }

      attendance.timeOut = signOutTime;
      attendance.totalHours = officeHours;

      // Determine status based on total hours
      if (officeHours === 0 || officeHours < 4) {
        attendance.status = "Absent";
      } else if (officeHours >= 4 && officeHours < 7) {
        attendance.status = "Half Day";
      } else if (officeHours >= 7 && officeHours < 9) {
        attendance.status = "Short Leave";
      } else if (officeHours >= 9) {
        attendance.status = "Full Day";
      }

      await attendance.save();

      // Return the updated attendance record in the response
      return res.status(200).json({
        id: attendance.id,
        timeOut: attendance.timeOut,
        totalHours: attendance.totalHours,
        status: attendance.status,
      });
    } catch (error) {
      console.error("Error signing out:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  autoSignOut: async () => {
    try {
      const currentDate = new Date();
      const midnight = new Date(currentDate);
      midnight.setHours(0, 0, 0, 0); // Set time to midnight

      // Find all active sign-ins that haven't been signed out
      const activeAttendances = await db.Attendance.findAll({
        where: {
          timeOut: null, // No sign-out time recorded
          createdAt: {
            [db.Sequelize.Op.lt]: midnight, // Created before midnight
          },
        },
      });

      // Update each active attendance record with sign-out time and status
      for (const attendance of activeAttendances) {
        attendance.timeOut = "00:00:00"; // Set sign-out time to midnight
        attendance.totalHours = 9; // Update total hours to 9
        attendance.status = "Present(forget dayout)"; // Update status to Absent

        await attendance.save();
      }

      console.log("Automatic sign-out completed successfully");
    } catch (error) {
      console.error("Error performing automatic sign-out:", error);
    }
  },

  createAttendance: async (req, res) => {
    try {
      const { UserId, date, timeIn, timeOut, totalHours, status } = req.body;
      const Attendance = await db.Attendance.create({
        UserId,
        date: new Date(date).toISOString().split("T")[0],
        timeIn,
        timeOut,
        totalHours,
        status,
      });
      return res.status(201).json(Attendance);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllAttendance: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const order = req.query.order || "desc";
      const sortColumn = req.query.sortColumn || "date";
      const sortOrder = req.query.sortOrder || "desc";

      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const nameFilter = req.query.name || null;
      const forDownload = req.query.forDownload === "true";

      // Extract client-side sorting parameters
      const clientSortColumn = req.query.clientSortColumn || "date";
      const clientSortOrder = req.query.clientSortOrder || "desc";

      // Construct the where condition for filtering by date range
      const dateFilter = {};
      if (startDate && endDate) {
        dateFilter.date = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      }

      const includeOptions = [
        {
          model: db.CreateUser,
          as: "CreateUser",
          where: nameFilter
            ? {
                name: nameFilter,
              }
            : undefined,
        },
      ];

      if (forDownload) {
        const downloadReports = await db.Attendance.findAll({
          include: includeOptions,
          where: dateFilter,
          order: [[clientSortColumn, clientSortOrder.toUpperCase()]],
        });
        const reports = downloadReports.map((attendance) => ({
          id: attendance.id,
          UserId: attendance.UserId,
          date: attendance.date,
          timeIn: formatTime(attendance.timeIn), // Format time here
          timeOut: formatTime(attendance.timeOut), // Format time here
          totalHours: attendance.totalHours,
          status: attendance.status,
          shift: attendance.shift,
          createdAt: attendance.createdAt,
          updatedAt: attendance.updatedAt,
          userName: attendance.CreateUser ? attendance.CreateUser.name : null,
        }));
    
        return res.status(200).json(reports);
      }

      // Modify order clause based on sortColumn and sortOrder
      const orderClause = [];
      if (sortColumn === "date") {
        orderClause.push(["date", sortOrder.toUpperCase()]);
        orderClause.push(["timeIn", sortOrder.toUpperCase()]); // Add timeIn to the sorting
      } else if (sortColumn === "timeIn") {
        orderClause.push(["timeIn", sortOrder.toUpperCase()]);
        orderClause.push(["date", sortOrder.toUpperCase()]); // Add date to the sorting
      }
      if (sortColumn === "userName") {
        orderClause.push([
          {
            model: db.CreateUser,
            as: "CreateUser",
          },
          "name",
          sortOrder.toUpperCase(),
        ]);
      } else {
        orderClause.push([sortColumn, sortOrder.toUpperCase()]);
      }

      const allAttendances = await db.Attendance.findAndCountAll({
        include: includeOptions,
        where: dateFilter,
        limit,
        offset,
        order: orderClause,
      });

      const modifiedAttendances = allAttendances.rows.map((attendance) => ({
        id: attendance.id,
        UserId: attendance.UserId,
        date: attendance.date,
        timeIn: formatTime(attendance.timeIn), // Format time here
        timeOut: formatTime(attendance.timeOut), // Format time here
        totalHours: attendance.totalHours,
        status: attendance.status,
        shift: attendance.shift,
        createdAt: attendance.createdAt,
        updatedAt: attendance.updatedAt,
        userName: attendance.CreateUser ? attendance.CreateUser.name : null,
      }));
      // console.log(modifiedAttendances)
      return res.status(200).json({
        totalCount: allAttendances.count,
        totalPages: Math.ceil(allAttendances.count / limit),
        currentPage: page,
        data: modifiedAttendances,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },
  getAttendanceData: async (req, res) => {
    try {
      const dateFilter = {};
      const allAttendances = await db.Attendance.findAll({
        include: [
          {
            model: db.CreateUser,
            as: "CreateUser",
          },
        ],
        where: dateFilter,
        order: [["date", "desc"], ["timeIn", "desc"]],
      });


      const modifiedAttendances = allAttendances.map((attendance) => ({
        id: attendance.id,
        UserId: attendance.UserId,
        date: attendance.date,
        timeIn: formatTime(attendance.timeIn),
        timeOut: formatTime(attendance.timeOut),
        totalHours: attendance.totalHours,
        status: attendance.status,
        shift: attendance.shift,
        createdAt: attendance.createdAt,
        updatedAt: attendance.updatedAt,
        userName: attendance.CreateUser ? attendance.CreateUser.name : null,
      }));
      return res.status(200).json({
        totalCount: allAttendances.length,
        data: modifiedAttendances,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  },

  getAttendanceById: async (req, res) => {
    try {
      const AttendanceId = req.params.id;
      const Attendance = await db.Attendance.findByPk(AttendanceId);
      if (!Attendance) {
        return res.status(404).json({ error: "Leave request not found" });
      }
      return res.status(200).json(Attendance);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateAttendance: async (req, res) => {
    try {
      const AttendanceId = req.params.id;
      const { UserId, date, timeIn, timeOut, totalHours, status } = req.body;
      const Attendance = await db.Attendance.findByPk(AttendanceId);
      if (!Attendance) {
        return res.status(404).json({ error: "Leave request not found" });
      }
      await Attendance.update({
        UserId,
        date: new Date(date).toISOString().split("T")[0],
        timeIn,
        timeOut,
        totalHours,
        status,
      });
      return res.status(200).json(Attendance);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteAttendance: async (req, res) => {
    try {
      const AttendanceId = req.params.id;
      const Attendance = await db.Attendance.findByPk(AttendanceId);
      if (!Attendance) {
        return res.status(404).json({ error: "Leave request not found" });
      }
      await Attendance.destroy();
      return res
        .status(200)
        .json({ message: "Leave request deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
// Helper function to format time in AM/PM format
function formatTime(time) {
  if (!time) return null;
  return new Date(`1970-01-01T${time}`).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

module.exports = AttendanceController;
