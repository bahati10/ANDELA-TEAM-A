module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      names: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.STRING
      }
      
    });
  
    return User;
  };