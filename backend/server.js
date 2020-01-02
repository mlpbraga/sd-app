/* eslint-disable no-console */

const initialize = require('./src/controllers/initializer');
const logger = require('./src/utils/logs.js');
const app = require('./app');

const port = 4513;
// const host = 'localhost';
// const environment = 'development';

initialize().then(() => {
  app.listen(port, () => {
    logger.log(`MedHelper API listening at ${port}`);
  });
   
}).catch((err) => {
  logger.error(
    `MedHelper API failed to listen at ${port} : err: ${err}`,
  );
});