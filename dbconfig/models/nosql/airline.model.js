module.exports = (mongoose) => {
  const Schema = mongoose.Schema;
  const AirlineSchema = new Schema(
    {
      segments_airline_name: {
        type: String,
        allowNull: false,
      },
      segments_airline_code: {
        type: String,
        allowNull: false,
      },
    },
    {
      tableName: "airline",
      timestamps: false,
    },
    { strict: false }
  );

  const Airline = mongoose.model("Airline", AirlineSchema);

  return { Airline, AirlineSchema };
};
