const airline = require("./airline.model");

module.exports = (sequelize, Sequelize) => {
  const Plane = sequelize.define(
    "Plane",
    {
      plane_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      segments_equipment_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "plane",
      timestamps: false,
    }
  );
  Plane.removeAttribute("createdAt");
  Plane.removeAttribute("updatedAt");
  return Plane;
};
