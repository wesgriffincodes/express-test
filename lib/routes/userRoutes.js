const { Router } = require('express');
const User = require('../model/userSchema');

module.exports = Router()

  .post('/', (req, res, next) => {
    const {
      name,
      age
    } = req.body;

    User
      .create({ name, age })
      .then(user => res.send(user))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    User
      .find()
      .select({ _id: true,  name: true })
      .then(users => res.send(users))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .select({ name: true, age: true })
      .then(user => res.send(user))
      .catch(next);
  })
  
  .put('/:id', (req, res, next) => {
    const {
      name,
      age
    } = req.body;

    User
      .findByIdAndUpdate(req.params.id, { name, age }, { new: true })
      .then(updateUser => res.send(updateUser))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    User
      .findByIdAndDelete(req.params.id)
      .then(user => res.send(user))
      .catch(next);
  });
