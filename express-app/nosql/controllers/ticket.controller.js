const db = require('../../../dbconfig/nosql-index');
const Ticket = db.Ticket;

exports.create = async (req, res) => {
  try {
    const ticket = {
      is_basic_economy: req.body.is_basic_economy,
      is_refundable: req.body.is_refundable,
      base_fare: req.body.base_fare,
      total_fare: req.body.total_fare,
      search_date: req.body.search_date,
      seat_remaining : req.body.seat_remaining,
      flight: {
        flight_details: {
          flight_date: req.body.flight_date,
          travel_duration: req.body.travel_duration,
          is_non_stop: req.body.is_non_stop, 
        },
        plane:{
          segments_equipment_description: req.body.segments_equipment_description, 
          airline: {
            segments_airline_name: req.body.segments_airline_name, 
            segments_airline_code: req.body.segments_airline_code
          }
        },
        starting_airport: {
          flight_name: req.body.starting_airport
        }, 
        destination_airport: {
         flight_name: req.body.destination_airport
        }
      },

    };     

    const newRecord = await new Ticket(ticket)
    await newRecord.save()
      .then(data => {
        res.send({message: "Ticket was created successfully."});
      })
  }
  catch(err) {
        res.status(500).send({
          message:
          err.message
      });
      };
};


// Find All 
exports.getAll = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).limit(1000)
    tickets ? res.send(tickets) : res.status(404).send({
      message: `Cannot find Tickets.`
    })
  }
  catch(err) {
      res.status(500).send({
        message:
        err.message 
     });
    }
};

// Find Single 
exports.get = async(req, res) => {
  const id = req.params.id;
  try {
    const ticket = await Ticket.findById(id)
    ticket ? res.send(ticket) : res.status(404).send({
      message: `Cannot find Ticket with id=${id}.`
    })
  }
  catch(err) {
      res.status(500).send({
        message:
        err.message
     });
    }
};

// Update 
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const ticketToUpdate = {
      is_basic_economy: req.body.is_basic_economy,
      is_refundable: req.body.is_refundable,
      base_fare: req.body.base_fare,
      total_fare: req.body.total_fare,
      search_date: req.body.search_date,
      seat_remaining : req.body.seat_remaining,
      flight: {
        flight_details: {
          flight_date: req.body.flight_date,
          travel_duration: req.body.travel_duration,
          is_non_stop: req.body.is_non_stop, 
        },
        plane:{
          segments_equipment_description: req.body.segments_equipment_description, 
          airline: {
            segments_airline_name: req.body.segments_airline_name, 
            segments_airline_code: req.body.segments_airline_code
          }
        },
        starting_airport: {
          flight_name: req.body.starting_airport
        }, 
        destination_airport: {
         flight_name: req.body.destination_airport
        }
      }
    }
    
    const ticket = await Ticket.findOneAndUpdate( 
      { _id: id }, ticketToUpdate
    )
    ticket ? 
      res.send({message: "Ticket was updated successfully."}) 
      : 
      res.status(404).send({message: `Cannot update Ticket with id=${id}.`
    })
  }
  catch(err) {
      res.status(500).send({
        message:
        err.message
     });
  }
};

// Delete 
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const result  = await Ticket.deleteOne(
      {_id: id});
      result.deletedCount === 1 ? res.send({message: "Ticket was deleted successfully."}) : res.status(404).send({
      message: `Cannot find Ticket with id=${id}.`
    })
  }
  catch(err) {
      res.status(500).send({
        message:
        err.message
     });
  }
};