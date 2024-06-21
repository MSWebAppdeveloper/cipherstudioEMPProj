module.exports = (sequelize, DataTypes) => {
  const LeaveTypes = sequelize.define("LeaveTypes", {
    leave_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    leave_type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leave_description: {
      type: DataTypes.TEXT,
    },
    allowed_leaves: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    assign_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return LeaveTypes;
};
