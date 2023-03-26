const db = require('../../../dbconfig/mysql-index');
const Plane = db.Plane;

exports.create = async (req, res) => {
  try {
    const plane = {
      airline_id: req.body.airline_id,
      segments_equipment_description: req.body.segments_equipment_description,
    }; 
    await Plane.create(plane)
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
    const planes = await Plane.findAll()
    planes ? res.send(planes) : res.status(404).send({
      message: `Cannot find Planes.`
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
    const plane = await Plane.findByPk(id);
    plane ? res.send(plane) : res.status(404).send({
      message: `Cannot find Plane with id=${id}.`
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
    await Plane.update(req.body, {
      where: { plane_id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "Plane was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Plane with id=${id}.`
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
    await Plane.destroy({
      where: { plane_id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "Plane was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Plane with id=${id}.`
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