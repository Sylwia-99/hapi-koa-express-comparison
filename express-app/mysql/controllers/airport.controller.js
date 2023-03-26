const db = require('../../../dbconfig/mysql-index');
const Airport = db.Airport;

exports.create = async (req, res) => {
  try {
    const airport = {
      flight_name: req.body.flight_name,
    }; 
    await Airport.create(airport)
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
    const airports = await Airport.findAll()
    airports ? res.send(airports) : res.status(404).send({
      message: `Cannot find Airport.`
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
    const airport = await Airport.findByPk(id);
    airport ? res.send(airport) : res.status(404).send({
      message: `Cannot find Airport with id=${id}.`
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
    await Airport.update(req.body, {
      where: { airport_id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "Airport was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Airport with id=${id}.`
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
    await Airport.destroy({
      where: { airport_id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "Airport was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Airport with id=${id}.`
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