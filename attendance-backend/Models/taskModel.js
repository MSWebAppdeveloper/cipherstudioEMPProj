module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedTo: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "Recently Added",
          "In Progress",
          "Completed",
          "Hold"
        ),
        defaultValue: "Recently Added",
      },
      estimatedTime: {
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
      takenTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      file: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  return Task;
};
