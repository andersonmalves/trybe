const User = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    // //createdAt e updatedAt estavam dando erro nos seeds, resolvi tirar, e passou no req2
    { timestamps: false },
  );
  return user;
};
module.exports = User;