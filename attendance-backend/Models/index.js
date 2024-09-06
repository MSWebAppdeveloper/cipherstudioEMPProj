//importing modules
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://postgres:admin@localhost:5432/demo`,
  { dialect: "postgres" }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to demo`);
  })
  .catch((err) => {
    console.log(err);
  });

  
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model

db.CreateUser = require("./createUserModel")(sequelize, DataTypes);
db.Attendance = require("./attendanceModel")(sequelize, DataTypes);
db.leavetypes = require("./leaveTypesModel")(sequelize, DataTypes);
db.approvalHistory = require("./approvalHistory")(sequelize, DataTypes);
db.leaveRequest = require("./leaveRequest")(sequelize, DataTypes);
db.notificationLog = require("./notificationLogModel")(sequelize, DataTypes);
db.Profile = require("./profileModel")(sequelize, DataTypes);
db.Task = require("./taskModel")(sequelize, DataTypes);
db.Project = require("./projectModel")(sequelize, DataTypes);
db.TaskHistory = require("./taskHistoryModel")(sequelize, DataTypes);
// Define associations

db.CreateUser.hasOne(db.Attendance, { foreignKey: "UserId", as: "Attendance" });
db.CreateUser.hasOne(db.Profile, { foreignKey: "UserId", as: "Profile" });
db.Profile.belongsTo(db.CreateUser, { foreignKey: "UserId" });
db.CreateUser.hasMany(db.leaveRequest, {
  foreignKey: "UserId",
  as: "LeaveRequest",
});
// Additional association for LeaveRequest
db.leaveRequest.belongsTo(db.CreateUser, {
  foreignKey: "UserId",
});
db.leaveRequest.belongsTo(db.leavetypes, {
  foreignKey: "leaveType",
  targetKey: "leave_type_name",
  as: "LeaveTypeDetails",
});

db.Attendance.belongsTo(db.CreateUser, {
  foreignKey: "UserId",
});

db.approvalHistory.belongsTo(db.leaveRequest, {
  foreignKey: "leave_request_id",
});
db.approvalHistory.belongsTo(db.CreateUser, {
  foreignKey: "approver_id",
});

db.CreateUser.hasMany(db.Task, { foreignKey: "UserId", as: "Task" });
db.Task.belongsTo(db.CreateUser, { foreignKey: "UserId", onDelete: "CASCADE" });

// New association for TaskHistory
db.Task.hasMany(db.TaskHistory, { foreignKey: "TaskId", as: "TaskHistory" });
db.TaskHistory.belongsTo(db.Task, {
  foreignKey: "TaskId",
});

// Additional association for LeaveRequest
db.Task.belongsTo(db.CreateUser, {
  foreignKey: "UserId",
});
//exporting the module
module.exports = db;
