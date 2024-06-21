module.exports = (sequelize, DataTypes) => {
  const CreateUser = sequelize.define(
    "CreateUser",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    { timestamps: true }
  );
  return CreateUser;
};
