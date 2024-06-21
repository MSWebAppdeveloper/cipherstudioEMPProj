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

// Define associations

db.CreateUser.hasOne(db.Attendance, { foreignKey: "UserId", as: "Attendance" });
db.CreateUser.hasMany(db.leaveRequest, {
  foreignKey: "UserId",
  as: "LeaveRequest",
});

// Additional association for LeaveRequest
db.leaveRequest.belongsTo(db.CreateUser, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
});
db.leaveRequest.belongsTo(db.leavetypes, {
  foreignKey: "leaveType",
  targetKey: "leave_type_name",
  as: "LeaveTypeDetails",
});

db.Attendance.belongsTo(db.CreateUser, {
  foreignKey: "UserId",
  onDelete: "CASCADE",
});

db.approvalHistory.belongsTo(db.leaveRequest, {
  foreignKey: "leave_request_id",
  onDelete: "CASCADE",
});
db.approvalHistory.belongsTo(db.CreateUser, {
  foreignKey: "approver_id",
  onDelete: "CASCADE",
});

//exporting the module
module.exports = db;
