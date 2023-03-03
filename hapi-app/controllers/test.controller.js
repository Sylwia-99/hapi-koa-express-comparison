const db = require('../../dbconfig/index');
const uuid = require('uuid')
const User = db.User;
const Boom = require('@hapi/boom')

exports.create = (req, res) => {
  const user = {
    idnew_table: uuid.v4(),
    name: req.payload.name,
    surname: req.payload.surname,
  };  
  return User.create(user)
    .then(data => {      
      return data;
    })
    .catch(err => {
      return reply(Boom.badRequest(err.message))
    });
};

// Find Single 
exports.getAll = async (req, res) => {
  return User.findAll()
    .then(data => {
      if (data) {
        return data ;
      } else {
        reply(Boom.notFound('Cannot find Users.'))
      }
    })
    .catch(err => {
      return reply(Boom.badRequest(err.message))
  });
};

// Find Single 
exports.get = async (req, res) => {
  const id = req.params.id;
  return User.findByPk(id)
    .then(data => {
      if (data) {
        return data ;
      } else {
        throw Boom.notFound(`Cannot find User with id=${id}.`)
      }
    })
    .catch(err => {
      throw Boom.badRequest(err.message)
    });
};

// Update 
exports.update = async (req, res) => {
  const id = req.params.id;

  return User.update(req.payload, {
    where: { idnew_table: id }
  })
  .then(num => {
    if (num == 1) {
      return "User was updated successfully."
    } else {
      return `Cannot update User with id=${id}.`
    }
  })
  .catch(err => {      
   throw Boom.badRequest(err.message)
  });
};

// Delete 
exports.delete = async (req, res) => {
  const id = req.params.id;
  return User.destroy({
    where: { idnew_table: id }
  })
  .then(num => {
    if (num == 1) {
      return "User was deleted successfully!"
    } else {
      return `Cannot delete User with id=${id}.`
    }
  })
  .catch(err => {
    throw Boom.badRequest(err.message)
  });
};