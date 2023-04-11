const db = require('../../../dbconfig/mysql-index');
const Boom = require('@hapi/boom')
const Airline = db.Airline;
const Plane = db.Plane;
const Airport = db.Airport;
const Flight = db.Flight;
const FlightDetails = db.FlightDetails;
const Ticket = db.Ticket;

exports.create = async (req, res) => {
  try{
    const airline = await Airline.findOrCreate({
      where: {
        segments_airline_name: req.payload.segments_airline_name, 
        segments_airline_code: req.payload.segments_airline_code
       }
    })
    const plane = await Plane.findOrCreate({
      where: { 
        airline_id: airline[0].dataValues.airline_id, 
        segments_equipment_description: req.payload.segments_equipment_description 
      }
    })

    const starting_airport = await Airport.findOrCreate({
      where: {
        airport_name: req.payload.starting_airport
      }
    })

    const destination_airport = await Airport.findOrCreate({
      where: {
        airport_name: req.payload.destination_airport
      }
    })

    const flight = await Flight.findOrCreate({
      where: {
        plane_id: plane[0].dataValues.plane_id,
        starting_airport_id: starting_airport[0].dataValues.airport_id,
        destination_airport_id: destination_airport[0].dataValues.airport_id,
      }
    })
    
    const flightDetails = await FlightDetails.findOrCreate({
      where:{
        fk_flight_id: flight[0].dataValues.flight_id,
        flight_date: req.payload.flight_date,
        travel_duration: req.payload.travel_duration,
        is_non_stop: req.payload.is_non_stop, 
      }
    })

    const ticket = {
        flight_id: flightDetails[0].dataValues.fk_flight_id,
        is_basic_economy: req.payload.is_basic_economy,
        is_refundable: req.payload.is_refundable,
        base_fare: req.payload.base_fare,
        total_fare: req.payload.total_fare,
        search_date: req.payload.search_date,
        seat_remaining : req.payload.seat_remaining,
    }; 

    const ticketCreated = await Ticket.create(ticket)
    return ticketCreated ? "Ticket was created successfully.": Boom.badRequest();
  }
  catch(err) {
   throw Boom.badRequest(err.message)
  }
};

// Find Single 
exports.getAll = async (req, res) => {
  try{
    const tickets = await Ticket.findAll({
      limit: 1000,
      attributes: [
        'ticket_id',
        'is_basic_economy',
        'is_refundable',
        'base_fare',
        'total_fare',
        'search_date',
        'seat_remaining',
      ], 
      include: [
        {        
        model: Flight,
        include: [
          { 
            model: FlightDetails,
            attributes: [          
              'flight_date',
              'travel_duration', 
              'is_non_stop'
            ],
          }, 
          {
            model: Plane,
            attributes: [
              'segments_equipment_description',
            ],
            include: [
              {
                model: Airline,
                attributes: [
                  'segments_airline_name',
                  'segments_airline_code', 
                ],
              }
            ],
          },
          {
            model: Airport, 
            attributes: [
              'airport_name',
            ],
            as: 'starting_airport',
          },
          {
            model: Airport, 
            attributes: [
              'airport_name',
            ],
            as: 'destination_airport'
          }
      ],   
      }
    ],
    })
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
    const ticket = await Ticket.findOne({
      where: { ticket_id: id },
      attributes: [
        'ticket_id',
        'is_basic_economy',
        'is_refundable',
        'base_fare',
        'total_fare',
        'search_date',
        'seat_remaining',
      ], 
      include: [{
        model: Flight,
        include: [
          { 
            model: FlightDetails, 
            attributes: [          
              'flight_date',
              'travel_duration', 
              'is_non_stop'
            ],
          }, 
          {
            model: Plane,
            attributes: [
              'segments_equipment_description',
            ],
            include: [
              {
                model: Airline,
                attributes: [
                  'segments_airline_name',
                  'segments_airline_code', 
                ],
              }
            ],
          },
          {
            model: Airport, 
            attributes: [
              'airport_name',
            ],
            as: 'starting_airport',
          },
          {
            model: Airport, 
            attributes: [
              'airport_name',
            ],
            as: 'destination_airport'
          }
      ]    
      }]
    })
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
    const ticket = await Ticket.findOne({
      where: { ticket_id: id },
      include: [{
        model: Flight,
        include: [
          { 
            model: FlightDetails, 
          }, 
          {
            model: Plane,
            include: [
              {
                model: Airline,
              }
            ],
          },
          {
            model: Airport, 
            as: 'starting_airport',
          },
          {
            model: Airport, 
            as: 'destination_airport'
          }
      ]    
      }]
    })
    const flightDetails = await FlightDetails.update(req.payload, {where: {fk_flight_id: ticket.flight_id}})
    const plane = await Plane.update(req.payload, {where: {plane_id: ticket.Flight.plane_id}})
    const airline = await Airline.update(req.payload, {where: {airline_id: ticket.Flight.Plane.airline_id}})
    const starting_airport = await Airport.update(req.payload, {where: {fk_flight_id: ticket.Flight.starting_airport.airport_id}})
    const destination_airport = await Airport.update(req.payload, {where: {fk_flight_id: ticket.Flight.destination_airport.airport_id}})
    const ticketUpdated = await ticket.update(req.payload)
    return ticket&&flightDetails&&plane&&airline&&starting_airport&&destination_airport&&ticketUpdated ?
      "Ticket was updated successfully." : Boom.badRequest(`Cannot update Ticket with id=${id}.`);
  }
  catch(err){
    throw Boom.badRequest(err.message)

  }
};

// Delete 
exports.delete = async (req, res) => {
  const id = req.params.id;
  try{
    const ticketToDelete = await Ticket.destroy({
      where: { ticket_id: id }
    })
    return ticketToDelete === 1 ?  "Ticket was deleted successfully!" : Boom.notFound(`Cannot delete Ticket with id=${id}.`);
  }
  catch(err) {
    throw Boom.badRequest(err.message)
  };
};