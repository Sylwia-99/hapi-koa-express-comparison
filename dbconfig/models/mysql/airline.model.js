module.exports = (sequelize, Sequelize) => {
  const Airline = sequelize.define(
    "Airline",
    {
      airline_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      segments_airline_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      segments_airline_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "airline",
      timestamps: false,
    }
  );
  Airline.removeAttribute("createdAt");
  Airline.removeAttribute("updatedAt");
  return Airline;
};
