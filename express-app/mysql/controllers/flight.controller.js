const db = require('../../../dbconfig/mysql-index');
const Flight = db.Flight;
const FlightDetails = db.FlightDetails;

exports.create = async (req, res) => {
  try {
    const flight = {
      plane_id: req.body.plane_id,
      starting_airport_id: req.body.starting_airport_id,
      destination_airport_id: req.body.destination_airport_id,
    }; 

    const newFlight  = Flight.create(flight)

    let flight_details = {
      flight_date: req.body.flight_date,
      travel_duration: req.body.travel_duration,
      is_non_stop: req.body.is_non_stop,
    }

    // const flight_details = {
    //   fk_flight_id: newFlight.flight_id,
    //   flight_date: req.body.flight_date,
    //   travel_duration: req.body.travel_duration,
    //   is_non_stop: req.body.is_non_stop,
    // }

    await Flight.create(flight)
      .then(async data => {
        flight_details.fk_flight_id =  data.flight_id
        await FlightDetails.create(flight_details)
        .then(flight_data => {
          res.send({flight: data, flight_details: flight_data});
        })
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
    const flights = await Flight.findAll()
    flights ? res.send(flights) : res.status(404).send({
      message: `Cannot find Flights.`
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
    const flight = await Flight.findByPk(id);
    flight ? res.send(flight) : res.status(404).send({
      message: `Cannot find Flight with id=${id}.`
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
    await FlightDetails.update(req.body, {
      where: { fk_flight_id: id }
    }).then(async num => {
      console.log(num)
        await Flight.update(req.body, {
          where: { flight_id: id }
        }).then(num2 => {
          console.log(num2)
          if (num == 1 || num2 == 1) {
            res.send({
              message: "Flight was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update Flight with id=${id}.`
            });
          }
        })
     
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
    await FlightDetails.destroy({
      where: { fk_flight_id: id }
    }).then(async num => {
      if (num == 1) {
        await Flight.destroy({
          where: { flight_id: id }
        }).then(num2 => {
          if (num2 == 1) {
            res.send({
              message: "Flight was deleted successfully."
            });
          } else {
            res.send({
              message: `Cannot delete Flight_Details with id=${id}.`
            });
          }
        })
      } else {
        res.send({
          message: `Cannot delete Flight with id=${id}.`
        });
      }
    })
  }
  catch(err) {
      res.status(500).send({
        message:
        err.message
     });
  }
};