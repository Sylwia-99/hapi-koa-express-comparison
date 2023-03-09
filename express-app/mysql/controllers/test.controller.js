const db = require('../../../dbconfig/mysql-index');
const uuid = require('uuid')
const User = db.User;

exports.create = async (req, res) => {
  try {
    const user = {
      idnew_table: uuid.v4(),
      name: req.body.name,
      surname: req.body.surname,
    }; 
    await User.create(user)
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

// Find Single 
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll()
    users ? res.send(users) : res.status(404).send({
      message: `Cannot find Users.`
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
    const user = await User.findByPk(id);
    user ? res.send(user) : res.status(404).send({
      message: `Cannot find User with id=${id}.`
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
    await User.update(req.body, {
      where: { idnew_table: id }
    }).then(num => {
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
    await User.destroy({
      where: { idnew_table: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}.`
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