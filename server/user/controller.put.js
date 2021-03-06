var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Q    = require('q');

// TODO: validations for field length/type

var putUser = function(req, res) {
  var userid = req.params.userid;
  User.forge({id: userid}).fetch().then(function(user) {
    return user.save(req.body);
  }).then(function(model) {
    res.send(200, model);
  });
};

var putPet = function(req, res) {
  var petid = req.params.petid;
  Pet.forge({id: petid}).fetch().then(function(pet) {
    return pet.save(req.body);
  }).then(function(model) {
    res.send(200, model);
  });
};

module.exports = exports = {
  putUser : putUser,
  putPet : putPet
};
