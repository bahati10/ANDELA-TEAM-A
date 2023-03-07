module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    names: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return User;
};
