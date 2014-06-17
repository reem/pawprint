var User = require('../app/models/user.js'),
    Users = require('../app/collections/users.js'),
    Pet = require('../app/models/pet.js'),
    Pets = require('../app/collections/pets.js'),
    Request = require('../app/models/request.js'),
    Requests = require('../app/collections/requests.js'),
    db = require('../app/db_config.js'),
    Q    = require('q');

// var getPet = function(req, res) {
//   // doesn't take into account vaccines
//   var userid = req.userid;
//   var pet = new Pet(req.body); // does this work?
//   // 
//   pet.save().then(function(newPet) {
//     Pets.add(newPet);
//     new User({id: userid}).fetch().then(function(found) {
//       if (found) {
//         newPet.belongsTo(found);
//       }
//       res.send(200, newPet);
//     });
//   });
// };

// // pet belongs to this userid

var getUser = function(req, res) {
  var userid = req.params.userid;
  
  User.forge({id: userid}).fetch().then(function(user){
    res.send(200, user);
  });
};

var getPets = function(req, res) {
  var userid = req.params.userid;

  db.knex('user_pet')
    .join('pet', 'user_pet.pet_id', '=', 'pet.id')
    .where('user_pet.user_id', userid)
    .select()
    .then(function(pets) {
      res.send(200, pets);
    });
};

var getRequests = function(req, res) {
  var userid = req.params.userid;
  
  db.knex('request')
    .where('user_id', userid)
    .select()
    .then(function(requests) {
      res.send(200, requests);
    });
};

module.exports = exports = {
  getUser : getUser, 
  getPets : getPets,
  getRequests : getRequests
};
