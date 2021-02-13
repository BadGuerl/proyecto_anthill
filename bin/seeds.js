const mongoose = require('mongoose');
const User = require('../models/user.model');
const Service = require('../models/service.model');
const userData = require('../data/users.json');

const serviceData = require('../data/services.json');

require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
  mongoose.connection.db.dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => User.create(userData))
    .then(users => {
      console.info(`- Added ${users.length} users`);
      const services = serviceData.map(service => {
        const userService = users.find(user => user.email === service.owner);
        service.owner = userService.id;  
        return service;
      });
      return Service.create(serviceData);
    })
    .then(services => console.info(`- Added ${services.length} services!`))
    .catch(error => console.error(error))
    .then(() => process.exit(0))
})


