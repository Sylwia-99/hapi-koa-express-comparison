const db = require("../../../dbconfig/mysql-index");
const Airline = db.Airline;
const Plane = db.Plane;
const Airport = db.Airport;
const Flight = db.Flight;
const FlightDetails = db.FlightDetails;
const Ticket = db.Ticket;

exports.create = async (ctx, next, body) => {
  try {
    const airline = await Airline.findOrCreate({
      where: {
        segments_airline_name: body.segments_airline_name,
        segments_airline_code: body.segments_airline_code,
      },
    });
    const plane = await Plane.findOrCreate({
      where: {
        airline_id: airline[0].dataValues.airline_id,
        segments_equipment_description: body.segments_equipment_description,
      },
    });

    const starting_airport = await Airport.findOrCreate({
      where: {
        airport_name: body.starting_airport,
      },
    });

    const destination_airport = await Airport.findOrCreate({
      where: {
        airport_name: body.destination_airport,
      },
    });

    const flight = await Flight.findOrCreate({
      where: {
        plane_id: plane[0].dataValues.plane_id,
        starting_airport_id: starting_airport[0].dataValues.airport_id,
        destination_airport_id: destination_airport[0].dataValues.airport_id,
      },
    });

    const flightDetails = await FlightDetails.findOrCreate({
      where: {
        fk_flight_id: flight[0].dataValues.flight_id,
        flight_date: body.flight_date,
        travel_duration: body.travel_duration,
        is_non_stop: body.is_non_stop,
      },
    });

    const ticket = {
      flight_id: flightDetails[0].dataValues.fk_flight_id,
      is_basic_economy: body.is_basic_economy,
      is_refundable: body.is_refundable,
      base_fare: body.base_fare,
      total_fare: body.total_fare,
      search_date: body.search_date,
      seat_remaining: body.seat_remaining,
    };
    const ticketCreated = await Ticket.create(ticket);
    return ticketCreated
      ? (ctx.body = "Ticket was created successfully.")
      : ctx.throw(400);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};

// Find Single
exports.getAll = async (ctx, next) => {
  try {
    const tickets = Ticket.findAll({
      limit: 100,
      attributes: [
        "ticket_id",
        "is_basic_economy",
        "is_refundable",
        "base_fare",
        "total_fare",
        "search_date",
        "seat_remaining",
      ],
      include: [
        {
          model: Flight,
          include: [
            {
              model: FlightDetails,
              attributes: ["flight_date", "travel_duration", "is_non_stop"],
            },
            {
              model: Plane,
              attributes: ["segments_equipment_description"],
              include: [
                {
                  model: Airline,
                  attributes: [
                    "segments_airline_name",
                    "segments_airline_code",
                  ],
                },
              ],
            },
            {
              model: Airport,
              attributes: ["airport_name"],
              as: "starting_airport",
            },
            {
              model: Airport,
              attributes: ["airport_name"],
              as: "destination_airport",
            },
          ],
        },
      ],
    });
    return tickets
      ? (ctx.body = tickets)
      : ctx.throw(404, `Cannot find Ticket.`);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};

// Find Single
exports.get = async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const ticket = await Ticket.findOne({
      where: { ticket_id: id },
      attributes: [
        "ticket_id",
        "is_basic_economy",
        "is_refundable",
        "base_fare",
        "total_fare",
        "search_date",
        "seat_remaining",
      ],
      include: [
        {
          model: Flight,
          include: [
            {
              model: FlightDetails,
              attributes: ["flight_date", "travel_duration", "is_non_stop"],
            },
            {
              model: Plane,
              attributes: ["segments_equipment_description"],
              include: [
                {
                  model: Airline,
                  attributes: [
                    "segments_airline_name",
                    "segments_airline_code",
                  ],
                },
              ],
            },
            {
              model: Airport,
              attributes: ["airport_name"],
              as: "starting_airport",
            },
            {
              model: Airport,
              attributes: ["airport_name"],
              as: "destination_airport",
            },
          ],
        },
      ],
    });
    return ticket
      ? (ctx.body = ticket)
      : ctx.throw(404, `Cannot find Ticket with id=${id}.`);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};

// Update
exports.update = async (ctx, next, body) => {
  const id = ctx.params.id;
  try {
    const ticket = await Ticket.findOne({
      where: { ticket_id: id },
      include: [
        {
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
                },
              ],
            },
            {
              model: Airport,
              as: "starting_airport",
            },
            {
              model: Airport,
              as: "destination_airport",
            },
          ],
        },
      ],
    });

    const flightDetails = await FlightDetails.update(body, {
      where: { fk_flight_id: ticket.flight_id },
    });
    const plane = await Plane.update(body, {
      where: { plane_id: ticket.Flight.plane_id },
    });
    const airline = await Airline.update(body, {
      where: { airline_id: ticket.Flight.Plane.airline_id },
    });
    const starting_airport = await Airport.update(body, {
      where: { fk_flight_id: ticket.Flight.starting_airport.airport_id },
    });
    const destination_airport = await Airport.update(body, {
      where: { fk_flight_id: ticket.Flight.destination_airport.airport_id },
    });
    const ticketUpdated = await ticket.update(body);

    return ticket &&
      flightDetails &&
      plane &&
      airline &&
      starting_airport &&
      destination_airport &&
      ticketUpdated
      ? (ctx.body = "Ticket was updated successfully.")
      : ctx.throw(400, `Cannot update Ticket with id=${id}.`);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};

// Delete
exports.delete = async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const ticketToDelete = await Ticket.destroy({
      where: { ticket_id: id },
    });
    return ticketToDelete === 1
      ? (ctx.body = "Ticket was deleted successfully!")
      : ctx.throw(404, `Cannot delete Ticket with id=${id}.`);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};
