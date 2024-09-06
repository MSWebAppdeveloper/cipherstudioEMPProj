module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define(
    "Projects",
    {
      projectName: {
        type: DataTypes.STRING,
        unique: true,
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

  return Projects;
};
