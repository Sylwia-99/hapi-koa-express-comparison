const db = require('../../../dbconfig/nosql-index');
const AirportSchema = db.Airport.AirportSchema;
const FlightDetailsSchema = db.FlightDetails.FlightDetailsSchema;
const PlaneSchema = db.Plane.PlaneSchema;

module.exports = (mongoose) => {
    const Schema = mongoose.Schema

    const FlightSchema =  new Schema( {
        flight_details: { 
            type: FlightDetailsSchema,
            required: true,
        },
        plane: { 
            type: PlaneSchema,     
            required: true
        },
        starting_airport: { 
            type: AirportSchema,
            required: true, 
        },
        destination_airport: { 
            type: AirportSchema,
            required: true, 
        }
    },
    {
        tableName: 'flight',
        timestamps: false
    }, { strict: false }) 

    const Flight = mongoose.model('Flight', FlightSchema);
    return {Flight, FlightSchema} ;
  };