const usersRoute = require('./users');
const medicinesRoute = require('./medicines');
const alarmsRoute = require('./alarms');
const examsRoute = require('./exams');
// const historyRoute = require('./history');
const loginRoute = require('./login');
const deviceRoute = require('./device');


const routes = {
    usersRoute,
    medicinesRoute,
    alarmsRoute,
    examsRoute,
    // historyRoute,
    loginRoute,
    deviceRoute,
};

module.exports = routes;