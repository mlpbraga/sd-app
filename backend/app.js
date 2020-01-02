const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
    usersRoute,
    examsRoute,
    medicinesRoute,
    alarmsRoute,
    historyRoute,
    loginRoute,
    deviceRoute,
} = require('./src/routes');


app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Resquestd-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', usersRoute);
app.use('/api/exams', examsRoute);
app.use('/api/medicines', medicinesRoute);
app.use('/api/alarms', alarmsRoute);
// app.use('/api/history', historyRoute);
app.use('/api/login', loginRoute);
app.use('/api/device', deviceRoute);

app.use('/', function(req, res, next) {
    res.status(200);
    res.json({status: 'OK'});
});

module.exports = app;