const moment = require('moment');

module.exports = (mongoose) => {
    const Schema = mongoose.Schema;

    const FlightDetailsSchema = new Schema( {
        flight_date: {
            type: Date,          
            allowNull: false,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
            },
        },
        travel_duration: {
            type: String,          
            allowNull: false
        },
        is_non_stop: {
            type: Boolean,          
            allowNull: false
        },
    },
    {
        tableName: 'flight_details',
        timestamps: false,
        toJSON: { getters: true, virtuals: true }
    }, { strict: false });

    const FlightDetails = mongoose.model('FlightDetails', FlightDetailsSchema);

    return {FlightDetails, FlightDetailsSchema};
  };