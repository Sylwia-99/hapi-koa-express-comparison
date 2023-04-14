const db = require("../../../dbconfig/nosql-index");
const AirlineSchema = db.Airline.AirlineSchema;

module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const PlaneSchema = new Schema(
    {
      segments_equipment_description: {
        type: String,
        allowNull: true,
      },
      airline: {
        type: AirlineSchema,
        required: true,
      },
    },
    {
      tableName: "plane",
      timestamps: false,
    },
    { strict: false }
  );

  const Plane = mongoose.model("Plane", PlaneSchema);

  return { Plane, PlaneSchema };
};
