const logger = require('./../../utils/logs');
const constant = require('./../../utils/constants');
const alarmDao = require('../../dao/alarm-dao');
const _ = require('lodash');
const uuidv1 = require('uuid/v1');
const AlarmsController = {
  async handleGet(req, res, next) {
    req.context = 'alarms';
    logger.request(req);
    try {
      let data = {};
      const { userid, medid, alarmid } = req.query;
      if (alarmid) {
        data = await alarmDao.readAlarm(userid, medid, alarmid);
      } else {
        data = await alarmDao.readAllByMedicine(userid, medid);
      }
      if (_.isEmpty(data)) {
        logger.error('Erro ao realizar consulta.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Consulta realizada com sucesso!');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e + ' Alarmes Controller::handleGet');

      // error handler middleware
      return next(e);
    }
  },
  async handlePost(req, res, next) {
    req.context = 'alarms';
    logger.request(req);
    try {
      let data = {};
      const { userid, medid } = req.query;
      const { alarm } = req.body;
      alarm._id = uuidv1();
      data = await alarmDao.add(userid, medid, alarm);
      if (!data) {
        logger.ok('Falha ao inserir alarme!');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Alarme inserido com sucesso!');
        return res.status(200).json({...constant.INSERT_MESSAGE, data});
      }
    } catch (e) {
      logger.error(e+ ' Alarmes Controller::handlePost');

      // error handler middleware
      return next(e);
    }
  },
  async handlePut(req, res, next) {
    req.context = 'alarms';
    logger.request(req);
    try {
      let data;
      const { userid, medid, alarmid } = req.query;
      const { alarm } = req.body;
      alarm._id = alarmid;
      data = await alarmDao.updateAlarm( userid, medid, alarmid, alarm);
      if (!data) {
        logger.error('Erro ao atualizar alarme.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Alarme atualizado com sucesso.');
        return res.status(200).json({...constant.UPDATE_MESSAGE, data});
      }
    } catch (e) {
      logger.error(e+ ' Alarmes Controller::handlePut');

      // error handler middleware
      return next(e);
    }
  },
  async handleDelete(req, res, next) {
    req.context = 'alarms';
    logger.request(req);
    try {
      let data;
      const { userid, medid, alarmid } = req.query;
      data = await alarmDao.deleteAlarm(userid, medid, alarmid);
      if (!data) {
        logger.error('Erro ao excluir alarme.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Alarme excluído com sucesso.');
        return res.status(200).json(constant.DELETE_MESSAGE);
      }
    } catch (e) {
      logger.error(e+ ' Alarmes Controller::handleDelete');

      // error handler middleware
      return next(e);
    }
  }
};

module.exports = AlarmsController;
