const db = require('../../dbconfig/index');
const uuid = require('uuid')
const User = db.User;

exports.create = async (ctx, next, body) => {
  const user = {
    idnew_table: uuid.v4(),
    name: body.name,
    surname: body.surname,
  };  
  return User.create(user)
    .then(data => {
      return ctx.body = data;
    })
    .catch(err => {
      return ctx.throw(500, err.message);
    });
};

// Find Single 
exports.getAll = async (ctx, next) => {
  return User.findAll()
    .then(data => {
      if (data) {
        return ctx.body = data
      } else {
        return ctx.throw(400, `Cannot find User.`);
      }
    })
    .catch(err => {
      return ctx.throw(500, err.message);
  });
};

// Find Single 
exports.get = async (ctx, next)=>{
  const id = ctx.params.id;
  return User.findByPk(id)
    .then(data => {
      if (data) { 
        return ctx.body = data
      } else {
        return ctx.throw(400, `Cannot find User with id=${id}.`);
      }
    })
    .catch(err => {
      return ctx.throw(500, err.message);
    });
};

// Update 
exports.update = (ctx, next, body) => {
  const id = ctx.params.id;
  return User.update(body, {
    where: { idnew_table: id }
  })
  .then(num => {
    if (num == 1) {
      return ctx.body = "User was updated successfully."
    } else {
      return ctx.throw(400, `Cannot update User with id=${id}.`);
    }
  })
  .catch(err => {
    return ctx.throw(500, err.message);
  });
};

// Delete 
exports.delete = (ctx, next) => {
  const id = ctx.params.id;
  return User.destroy({
    where: { idnew_table: id }
  })
  .then(num => {
    if (num == 1) {
      return ctx.body = "User was deleted successfully!"
    } else { 
      return ctx.throw(400, `Cannot delete User with id=${id}.`);
    }
  })
  .catch(err => {
    return ctx.throw(500, err.message);
  });
};