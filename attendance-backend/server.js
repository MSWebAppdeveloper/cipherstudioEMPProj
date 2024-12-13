const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./Models");
const createUserRoutes = require("./Routes/createUserRoutes");
const attendanceRoutes = require("./Routes/attendanceRoutes");
const leaveTypesRoutes = require("./Routes/leaveTypesRoutes");
const leaveRequestRoutes = require("./Routes/leaveRequestRoutes");
const approvalTableRoutes = require("./Routes/approvalTableRoutes");
const notificationLogRoutes = require("./Routes/notificationLogRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const projectRoutes = require("./Routes/projectRoutes");
<<<<<<< HEAD
const rulesForCalendarRoutes = require("./Routes/rulesForCalendarRoutes");
=======
const rulesForCalendarRoutes=require("./Routes/rulesForCalendarRoutes")
>>>>>>> 1fcb40ee9e06e2dae81020d0ef82af8023171916

const PORT = process.env.PORT || 8080;
const app = express();
const http = require("http");
const server = http.createServer(app);
const cron = require("node-cron");
const socketIO = require("socket.io");
const { autoSignOut } = require("./Controllers/attendanceController");
const approvalHistoryController = require("./Controllers/approvalHistoryController");
const { autoDeleteLeaves } = require("./Controllers/leaveRequestController");

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Store user ID and socket ID upon connection
  connectedUsers[socket.userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Remove user ID and socket ID upon disconnection
    delete connectedUsers[socket.userId];
  });
});

function getRecipientSocketId(userId) {
  return connectedUsers[userId];
}
const SocketId = getRecipientSocketId();

approvalHistoryController.setIo(io);

// Schedule the autoSignOut function to run at midnight (00:00:00) every day
cron.schedule("0 0 * * *", () => {
  autoSignOut();
  autoDeleteLeaves();
});

// Immediately run autoSignOut and autoDeleteLeaves upon server start
(async () => {
  await autoSignOut();
  await autoDeleteLeaves();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/employee", createUserRoutes);
app.use("/api/employee", attendanceRoutes);
app.use("/api/leavetypes", leaveTypesRoutes);
app.use("/api", leaveRequestRoutes);
app.use("/api", approvalTableRoutes);
app.use("/api", notificationLogRoutes);
app.use("/api", taskRoutes);
app.use("/api", projectRoutes);
app.use("/api", rulesForCalendarRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
