module.exports = (sequelize, DataTypes) => {
  const TaskHistory = sequelize.define(
    "TaskHistory",
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TaskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      holdTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      resumeTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      totalSpentTime: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  return TaskHistory;
};
