const db = require('../../dbconfig/index');
const uuid = require('uuid')
const User = db.User;

exports.create = (req, res) => {
  console.log(req)
  const user = {
    idnew_table: uuid.v4(),
    name: req.body.name,
    surname: req.body.surname,
  };  
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message
     });
    });
};

// Find Single 
exports.getAll = (req, res) => {
  User.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Users.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: err.message
    });
  });
};

// Find Single 
exports.get = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
      message: err.message
    });
  });
};

// Update 
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { idnew_table: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}.`
      });
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({
      message: err.message
    });
  });
};

// Delete 
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { idnew_table: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};