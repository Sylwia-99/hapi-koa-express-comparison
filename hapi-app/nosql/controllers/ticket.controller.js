const db = require('../../../dbconfig/nosql-index');
const Boom = require('@hapi/boom')
const Ticket = db.Ticket;

exports.create = async (req, res) => {
  try{
    const ticket = {
      is_basic_economy: req.payload.is_basic_economy,
      is_refundable: req.payload.is_refundable,
      base_fare: req.payload.base_fare,
      total_fare: req.payload.total_fare,
      search_date: req.payload.search_date,
      seat_remaining : req.payload.seat_remaining,
      flight: {
        flight_details: {
          flight_date: req.payload.flight_date,
          travel_duration: req.payload.travel_duration,
          is_non_stop: req.payload.is_non_stop, 
        },
        plane:{
          segments_equipment_description: req.payload.segments_equipment_description, 
          airline: {
            segments_airline_name: req.payload.segments_airline_name, 
            segments_airline_code: req.payload.segments_airline_code
          }
        },
        starting_airport: {
          flight_name: req.payload.starting_airport
        }, 
        destination_airport: {
         flight_name: req.payload.destination_airport
        }
      },
  
    };     
  
    const newRecord = await new Ticket(ticket).save()
    return newRecord ? "Ticket was created successfully." :  Boom.badRequest();     
  }
  catch(err){
    throw Boom.badRequest(err.message)
  }
};

// Find Single 
exports.getAll = async (req, res) => {
  try{
    const tickets = await Ticket.find({}).limit(1000)
    return tickets ? tickets : Boom.badRequest(`Cannot find Tickets.`) ;
  }
  catch(err){
    throw Boom.badRequest(err.message)
  }
};

// Find Single 
exports.get = async (req, res) => {
  const id = req.params.id;
  try{
    const ticket = await Ticket.findById(id)
    return ticket ? ticket : Boom.notFound(`Cannot find Ticket with id=${id}.`)
  }
  catch(err){
    throw Boom.badRequest(err.message)
  }
};

// Update 
exports.update = async (req, res) => {
  const id = req.params.id;
  try{
    const ticketToUpdate = {
      is_basic_economy: req.payload.is_basic_economy,
      is_refundable: req.payload.is_refundable,
      base_fare: req.payload.base_fare,
      total_fare: req.payload.total_fare,
      search_date: req.payload.search_date,
      seat_remaining : req.payload.seat_remaining,
      flight: {
        flight_details: {
          flight_date: req.payload.flight_date,
          travel_duration: req.payload.travel_duration,
          is_non_stop: req.payload.is_non_stop, 
        },
        plane:{
          segments_equipment_description: req.payload.segments_equipment_description, 
          airline: {
            segments_airline_name: req.payload.segments_airline_name, 
            segments_airline_code: req.payload.segments_airline_code
          }
        },
        starting_airport: {
          flight_name: req.payload.starting_airport
        }, 
        destination_airport: {
         flight_name: req.payload.destination_airport
        }
      }
    }
    const ticketUpdated = await Ticket.findOneAndUpdate(  
     { _id: id }, ticketToUpdate)
    return  ticketUpdated ? "Ticket was updated successfully." : Boom.badRequest(`Cannot update Ticket with id=${id}.`);
  }
  catch(err){
    throw Boom.badRequest(err.message)
  }
 
};

// Delete 
exports.delete = async (req, res) => {
  const id = req.params.id;
  return Ticket.deleteOne(
    {_id: id})
  .then(data => {
    if (data.deletedCount == 1) {
      return "Ticket was deleted successfully!"
    } else {     
       throw Boom.notFound(`Cannot delete Ticket with id=${id}.`)
    }
  })
  .catch(err => {
    throw Boom.badRequest(err.message)
  });
};