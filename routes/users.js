const express = require('express');
const {User, validate} = require ('../models/user');
const mongoose = require('mongoose');
const router = express.Router();
const _ = require('lodash');


// router.get('/', async (req, res) => {
//   let genres = await Genre.find().sort('name');
//   res.send(genres);
// });

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});  //Find an object by its property.
  if(user) return res.status(400).send('User is already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  await user.save();

  res.send(_.pick(user, ['_id','name', 'email']));
});

// router.put('/:id', async(req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
  
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
//    res.send(genre);
// });

// router.delete('/:id', async (req, res) => {

//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');

//   res.send(genre);
// });

// router.get('/:id', async (req, res) => {
//   const genre = await Genre.findById(req.params.id);
//   if (!genre) return res.status(404).send('The genre with the given ID was not found.');
//   res.send(genre);
// });

module.exports = router;