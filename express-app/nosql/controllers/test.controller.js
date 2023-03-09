const db = require('../../../dbconfig/nosql-index');
const User = db.User;

exports.create = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
    }); 

    const savedUser = await user.save();
    res.json(savedUser);
  }
  catch(err) {
      res.status(500).send({
        message:
        err.message
     });
    }
};

// Find Single 
exports.getAll = async (req, res) => {
  try {
    const users = await User.find({});
    users ? res.json(users) : res.status(404).send({
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
exports.get = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    user ? res.json(user) : res.status(404).send({
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
    const user = await User.findOneAndUpdate(
      {_id: id},
      req.body);
    user ? res.send({message: "User was updated successfully."}) : res.status(404).send({
      message: `Cannot find User with id=${id}.`
    })
  }
  catch(err) {
    if (err.name === 'ValidationError') {
      res.status(422).send(err)
    } else{
      res.status(500).send({
        message:
        err.message
     });}
    }
  }

// Delete 
exports.delete = async(req, res) => {
  const id = req.params.id;

  try {
    const result  = await User.deleteOne(
      {_id: id});
      result.deletedCount === 1 ? res.send({message: "User was deleted successfully."}) : res.status(404).send({
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