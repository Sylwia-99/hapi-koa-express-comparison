const moment = require('moment');
const db = require('../../../dbconfig/nosql-index');
const FlightSchema = db.Flight.FlightSchema;

module.exports = (mongoose) => {   
    const Schema = mongoose.Schema;
    const TicketSchema = new Schema( {
        is_basic_economy: {
            type: Boolean,          
            allowNull: false
        },
        is_refundable : {
            type: Boolean,          
            allowNull: false
        },
        base_fare: {
            type: Number,          
            allowNull: false
        },
        total_fare: {
            type: Number,          
            allowNull: false
        },
        search_date: {
            type: Date,          
            allowNull: false,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
            },
        },
        seat_remaining: {
            type: Number,          
            allowNull: false
        },
        flight: { 
            type: FlightSchema,
            required: true,
        },
    },
    {
        tableName: 'ticket',
        timestamps: false, 
        toJSON: { getters: true, virtuals: true }
    }, { strict: false });

    const Ticket = mongoose.model('Ticket', TicketSchema);
    return Ticket;
  };