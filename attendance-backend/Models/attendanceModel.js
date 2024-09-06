module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    shift: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timeIn: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    timeOut: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    homeActiveStart: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    homeActiveEnd: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    totalHours: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Attendance;
};
