const logger = require('../utils/logs');
const mongoose = require('mongoose');

async function initializer() {
  setTimeout(() => {
    mongoose.connect(
      'mongodb://mongo:27017/docker-node-mongo',
      { useNewUrlParser: true },
    )
      .then(() => logger.log('MongoDB connected'))
      .catch(err => logger.error(err));
  }, 5000);
  logger.log('MedHelper Api Initialized!');
}

module.exports = initializer;
