const db = require('../../../dbconfig/nosql-index');
const User = db.User;

exports.create = async (ctx, next, body) => {
  try{
    const user = new User({
      name: body.name,
      surname: body.surname,
    });   

    const savedUser = await user.save();
    return ctx.body = savedUser;
  }
  catch(err) {
    return ctx.throw(500, err.message);
  }
};

// Find Single 
exports.getAll = async (ctx, next) => {
  try {
    const users = await User.find({});
    return  users ? ctx.body = users : ctx.throw(400, `Cannot find Users.`);
  }
  catch(err) {
    return ctx.throw(500, err.message);
  }
};

// Find Single 
exports.get = async (ctx, next)=>{
  const id = ctx.params.id;

  try {
    const user = await User.findById(id);
    return user ? ctx.body = user : ctx.throw(400, `Cannot find User with id=${id}.`);
  }
  catch(err) {
    return ctx.throw(500, err.message);
    }
};

// Update 
exports.update = async (ctx, next, body) => {
  const id = ctx.params.id;

  try {
    const user = await User.findOneAndUpdate(
      {_id: id},
      body);
    return user ? ctx.body = "User was updated successfully." : ctx.throw(400, `Cannot update User with id=${id}.`);
  }
  catch(err) {
    if (err.name === 'ValidationError') {
      return ctx.throw(422, err.message);
    } else{
      return ctx.throw(500, err.message);
    }
  }
};

// Delete 
exports.delete = async (ctx, next) => {
  const id = ctx.params.id;

  try {
    const result  = await User.deleteOne(
      {_id: id});
      return result.deletedCount === 1 ? ctx.body = "User was deleted successfully!" : ctx.throw(400, `Cannot delete User with id=${id}.`);
  }
  catch(err) {
    return ctx.throw(400, err.message);
    }
};