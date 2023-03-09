module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
   idnew_table: {
      type: Sequelize.UUID,
      autoIncrement: true,
      primaryKey: true,        
      allowNull: false
   },
   name: {
      type: Sequelize.STRING,        
   },
   surname: {
      type: Sequelize.STRING,
   },
   });  
   return User;
};