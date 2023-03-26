const db = require('../../../dbconfig/mysql-index');
const Airline = db.Airline;

exports.create = async (req, res) => {
  try {
    const airline = {
      segments_airline_name: req.body.segments_airline_name,
      segments_airline_code: req.body.segments_airline_code,
    }; 
    await Airline.create(airline)
      .then(data => {
        res.send(data);
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
    const airlines = await Airline.findAll()
    airlines ? res.send(airlines) : res.status(404).send({
      message: `Cannot find Airlines.`
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
    const airline = await Airline.findByPk(id);
    airline ? res.send(airline) : res.status(404).send({
      message: `Cannot find Airline with id=${id}.`
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
    await Airline.update(req.body, {
      where: { airline_id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "Airline was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Airline with id=${id}.`
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

// Delete 
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Airline.destroy({
      where: { airline_id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "Airline was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Airline with id=${id}.`
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