const db = require("../../../dbconfig/mysql-index");
const Airline = db.Airline;
const Plane = db.Plane;
const Airport = db.Airport;
const Flight = db.Flight;
const FlightDetails = db.FlightDetails;
const Ticket = db.Ticket;

exports.create = async (req, res) => {
  try {
    const airline = await Airline.findOrCreate({
      where: {
        segments_airline_name: req.body.segments_airline_name,
        segments_airline_code: req.body.segments_airline_code,
      },
    });

    const plane = await Plane.findOrCreate({
      where: {
        airline_id: airline[0].dataValues.airline_id,
        segments_equipment_description: req.body.segments_equipment_description,
      },
    });

    const starting_airport = await Airport.findOrCreate({
      where: {
        airport_name: req.body.starting_airport,
      },
    });

    const destination_airport = await Airport.findOrCreate({
      where: {
        airport_name: req.body.destination_airport,
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
        flight_date: req.body.flight_date,
        travel_duration: req.body.travel_duration,
        is_non_stop: req.body.is_non_stop,
      },
    });

    const ticket = {
      flight_id: flightDetails[0].dataValues.fk_flight_id,
      is_basic_economy: req.body.is_basic_economy,
      is_refundable: req.body.is_refundable,
      base_fare: req.body.base_fare,
      total_fare: req.body.total_fare,
      search_date: req.body.search_date,
      seat_remaining: req.body.seat_remaining,
    };

    await Ticket.create(ticket).then((data) => {
      res.send({ message: "Ticket was created successfully." });
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Find All
exports.getAll = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
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
    tickets
      ? res.send(tickets)
      : res.status(404).send({
          message: `Cannot find Tickets.`,
        });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Find Single
exports.get = async (req, res) => {
  const id = req.params.id;
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

    ticket
      ? res.send(ticket)
      : res.status(404).send({
          message: `Cannot find Ticket with id=${id}.`,
        });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Update
exports.update = async (req, res) => {
  const id = req.params.id;
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
    const flightDetails = await FlightDetails.update(req.body, {
      where: { fk_flight_id: ticket.flight_id },
    });
    const plane = await Plane.update(req.body, {
      where: { plane_id: ticket.Flight.plane_id },
    });
    const airline = await Airline.update(req.body, {
      where: { airline_id: ticket.Flight.Plane.airline_id },
    });
    const starting_airport = await Airport.update(req.body, {
      where: { fk_flight_id: ticket.Flight.starting_airport.airport_id },
    });
    const destination_airport = await Airport.update(req.body, {
      where: { fk_flight_id: ticket.Flight.destination_airport.airport_id },
    });
    const ticketUpdated = await ticket.update(req.body);
    ticket &&
    flightDetails &&
    plane &&
    airline &&
    starting_airport &&
    destination_airport &&
    ticketUpdated
      ? res.send({ message: "Ticket was updated successfully." })
      : res
          .status(404)
          .send({ message: `Cannot update Ticket with id=${id}.` });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// Delete
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Ticket.destroy({
      where: { ticket_id: id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: "Ticket was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Ticket with id=${id}.`,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
