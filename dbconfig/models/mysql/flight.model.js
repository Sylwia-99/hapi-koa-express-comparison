module.exports = (sequelize, Sequelize) => {
  const Flight = sequelize.define(
    "Flight",
    {
      flight_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "flight",
      timestamps: false,
    }
  );
  Flight.removeAttribute("createdAt");
  Flight.removeAttribute("updatedAt");
  return Flight;
};
