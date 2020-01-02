// const deviceFormatter = require('../../model/device');
const logger = require('./../../utils/logs');
const utils = require('../../utils');
const constant = require('./../../utils/constants');
const alarmDao = require('../../dao/alarm-dao');
const deviceDao = require('../../dao/device-dao');
const _ = require('lodash');
const uuidv1 = require('uuid/v1');

const DeviceController = {
  async handleCreate(req, res, next) {
    try {
      const { userid } = req.query;
      const data = await deviceDao.createDevice(userid);
      if (_.isEmpty(data)) {
        logger.error('Erro ao criar dispositivo.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Dispositivo criado com sucesso!');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e + ' Dispositivo Controller::handleGet');
      return next(e);
    }
  },
  async handleGet(req, res, next) {
    req.context = 'device';
    logger.request(req);
    try {
      const { userid, deviceid } = req.query;
      let data = {
        deviceid,
        userid,
        status: 0,
        slot: 0,
      };
      if (deviceid) {
        const nowTime = utils.agora();
        const alarmes = await deviceDao.checkNowAlarms(userid);
        alarmes.forEach(element => {
          if (_.includes(element.dias, nowTime.dia)) {
            if (
              _.includes(element.horas, `${nowTime.hora}:${nowTime.minuto-2}`)
              || _.includes(element.horas, `${nowTime.hora}:${nowTime.minuto-1}`)
            ) {
              data = {
                ...data,
                slot: element.slot,
                status: 2,
              }
              logger.warning('POSICIONANDO DISPOSITIVO');
            }
          } else if (_.includes(element.dias, nowTime.dia)) {
            if (
              _.includes(element.horas, `${nowTime.hora}:${nowTime.minuto}`)
              || _.includes(element.horas, `${nowTime.hora}:${nowTime.minuto+1}`)
            ) {
              data = {
                ...data,
                slot: element.slot,
                status: 1,
              }
              logger.warning('HORA DO ALARME');
            }
          }
        });
      } else {
        data = await deviceDao.readDevice(userid);
      }
      if (_.isEmpty(data)) {
        logger.error('Erro ao realizar consulta.');
        return res.status(404).json(data = {
          ...data,
          status: 0,
        });
      } else {
        logger.ok('Consulta realizada com sucesso!');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e + ' Alarmes Controller::handleGet');
      return next(e);
    }
  },
  async handlePost(req, res, next) {
    try {
      let data = {};
      const { userid } = req.query;

      device._id = uuidv1();
      data = await alarmDao.add(userid, medid, alarm);
      if (!data) {
        logger.ok('Falha ao inserir alarme!');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Alarme inserido com sucesso!');
        return res.status(200).json({ ...constant.INSERT_MESSAGE, data });
      }
    } catch (e) {
      logger.error(e + ' Alarmes Controller::handlePost');

      // error handler middleware
      return next(e);
    }
  },
  async handlePut(req, res, next) {
    try {
      let data;
      const { userid, medid, alarmid } = req.query;
      const { alarm } = req.body;
      alarm._id = alarmid;
      data = await alarmDao.updateAlarm(userid, medid, alarmid, alarm);
      if (!data) {
        logger.error('Erro ao atualizar alarme.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Alarme atualizado com sucesso.');
        return res.status(200).json({ ...constant.UPDATE_MESSAGE, data });
      }
    } catch (e) {
      logger.error(e + ' Alarmes Controller::handlePut');

      // error handler middleware
      return next(e);
    }
  },
  async handleDelete(req, res, next) {
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
      logger.error(e + ' Alarmes Controller::handleDelete');

      // error handler middleware
      return next(e);
    }
  }
};

module.exports = DeviceController;
