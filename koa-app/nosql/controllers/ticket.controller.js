const db = require("../../../dbconfig/nosql-index");
const Ticket = db.Ticket;

exports.create = async (ctx, next, body) => {
  try {
    const ticket = {
      is_basic_economy: body.is_basic_economy,
      is_refundable: body.is_refundable,
      base_fare: body.base_fare,
      total_fare: body.total_fare,
      search_date: body.search_date,
      seat_remaining: body.seat_remaining,
      flight: {
        flight_details: {
          flight_date: body.flight_date,
          travel_duration: body.travel_duration,
          is_non_stop: body.is_non_stop,
        },
        plane: {
          segments_equipment_description: body.segments_equipment_description,
          airline: {
            segments_airline_name: body.segments_airline_name,
            segments_airline_code: body.segments_airline_code,
          },
        },
        starting_airport: {
          airport_name: body.starting_airport,
        },
        destination_airport: {
          airport_name: body.destination_airport,
        },
      },
    };

    await new Ticket(ticket).save().then((data) => {
      return (ctx.body = "Ticket was created successfully.");
    });
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};

// Find Single
exports.getAll = async (ctx, next) => {
  try {
    const tickets = await Ticket.find().limit(1000);
    return tickets
      ? (ctx.body = tickets)
      : ctx.throw(400, `Cannot find Tickets.`);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};

// Find Single
exports.get = async (ctx, next) => {
  const id = ctx.params.id;

  try {
    const ticket = await Ticket.findById(id);
    return ticket
      ? (ctx.body = ticket)
      : ctx.throw(400, `Cannot find Ticket with id=${id}.`);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};

// Update
exports.update = async (ctx, next, body) => {
  const id = ctx.params.id;
  const ticketToUpdate = {
    is_basic_economy: body.is_basic_economy,
    is_refundable: body.is_refundable,
    base_fare: body.base_fare,
    total_fare: body.total_fare,
    search_date: body.search_date,
    seat_remaining: body.seat_remaining,
    flight: {
      flight_details: {
        flight_date: body.flight_date,
        travel_duration: body.travel_duration,
        is_non_stop: body.is_non_stop,
      },
      plane: {
        segments_equipment_description: body.segments_equipment_description,
        airline: {
          segments_airline_name: body.segments_airline_name,
          segments_airline_code: body.segments_airline_code,
        },
      },
      starting_airport: {
        airport_name: body.starting_airport,
      },
      destination_airport: {
        airport_name: body.destination_airport,
      },
    },
  };
  try {
    const ticket = await Ticket.findOneAndUpdate({ _id: id }, ticketToUpdate);
    return ticket
      ? (ctx.body = "Ticket was updated successfully.")
      : ctx.throw(400, `Cannot update Ticket with id=${id}.`);
  } catch (err) {
    if (err.name === "ValidationError") {
      return ctx.throw(422, err.message);
    } else {
      return ctx.throw(err.statusCode || 500, err.message);
    }
  }
};

// Delete
exports.delete = async (ctx, next) => {
  const id = ctx.params.id;
  try {
    const result = await Ticket.deleteOne({ _id: id });
    return result.deletedCount === 1
      ? (ctx.body = "Ticket was deleted successfully!")
      : ctx.throw(400, `Cannot delete Ticket with id=${id}.`);
  } catch (err) {
    return ctx.throw(err.statusCode || 500, err.message);
  }
};
