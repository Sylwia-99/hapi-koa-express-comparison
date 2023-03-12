const db = require('../../../dbconfig/nosql-index');
const User = db.User;
const Boom = require('@hapi/boom')

exports.create = async (req, res) => {
  const user = new User({
    name: req.payload.name,
    surname: req.payload.surname,
  });  
  return user.save()
    .then(data => {      
      return data;
    })
    .catch(err => {
      return reply(Boom.badRequest(err.message))
    });
};

// Find Single 
exports.getAll = async (req, res) => {
  return User.find({})
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
  return User.findById(id)
    .then(data => {
      if (data !==null) {
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

  return User.findOneAndUpdate(  
    {_id: id},
    req.payload)
  .then(data => {
    if (data !== null) {
      return "User was updated successfully."
    } else {
      throw Boom.notFound(`Cannot update User with id=${id}.`)
    }
  })
  .catch(err => {      
   throw Boom.badRequest(err.message)
  });
};

// Delete 
exports.delete = async (req, res) => {
  const id = req.params.id;
  return User.deleteOne(
    {_id: id})
  .then(data => {
    if (data.deletedCount == 1) {
      return "User was deleted successfully!"
    } else {     
       throw Boom.notFound(`Cannot delete User with id=${id}.`)
    }
  })
  .catch(err => {
    throw Boom.badRequest(err.message)
  });
};