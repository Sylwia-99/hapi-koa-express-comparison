module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const AirportSchema = new Schema(
    {
      airport_name: {
        type: String,
        allowNull: false,
      },
    },
    {
      tableName: "airport",
      timestamps: false,
    },
    { strict: false }
  );
  const Airport = mongoose.model("Airport", AirportSchema);
  return { Airport, AirportSchema };
};
