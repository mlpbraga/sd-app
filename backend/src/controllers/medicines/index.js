const medicinesFormatter = require('../../model/medicines');
const medicineDao = require('../../dao/medicines-dao');
const userDao = require('../../dao/user-dao');
const logger = require('./../../utils/logs');
const constant = require('./../../utils/constants');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

const MedicinesController = {
  async handleGet(req, res, next) {
    req.context = 'medicines';
    logger.request(req);
    try {
      let data;
      let medicines;
      const { 
        userid,
        medid,
      } = req.query;
      if (userid && medid) {
        medicines = await medicineDao.readMedicine(userid, medid);
      } else if (userid) {
        medicines = await medicineDao.readAll(userid);
      }
      data = !_.isEmpty(medicines) ? medicines : [];
      // const data = medicinesFormatter.format(req.query);
      if (_.isEmpty(data)) {
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Consulta realizada com sucesso!');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e + ' Medicamentos Controller::handleGet');

      // error handler middleware
      return next(e);
    }
  },
  async handlePost(req, res, next) {
    req.context = 'medicines';
    logger.request(req);
    console.log(req.body);
    try {
      const { userid } = req.query;
      const { medicine } = req.body;
      medicine._id = uuidv1();
      medicine.alarmes = [];
      medicine.pilulas.restantes = medicine.pilulas.quantidadeInicial;
      const data = medicinesFormatter.formatOne(medicine);
      await medicineDao.add(userid,data);
      if (!data) {
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Medicamento inserido com sucesso!');
        return res.status(200).json({...constant.INSERT_MESSAGE, data});
      }
    } catch (e) {
      logger.error(e+ ' Medicamentos Controller::handlePost');
      return next(e);
    }
  },
  async handlePut(req, res, next) {
    req.context = 'medicines';
    logger.request(req);
    try {
      const { userid, medid } = req.query;
      const { medicine } = req.body;
      medicine._id = medid;
      if ( _.isEmpty(medicine.alarmes) ) medicine.alarmes = [];
      const medicines = await medicineDao.updateMedicine(userid, medid, medicine);
      const data = !_.isEmpty(medicine) ? medicinesFormatter.formatOne(medicines) : {}
      if (!data) {
        logger.error('Erro ao alterar o medicamento');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Medicamento alterado com sucesso.');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e+ ' Medicamentos Controller::handlePut');
      return next(e);
    }
  },
  async handleDelete(req, res, next) {
    req.context = 'medicines';
    logger.request(req);
    try {
      const { userid, medid } = req.query;
      await medicineDao.deleteMedicine(userid, medid);
      return res.status(200).json(constant.DELETE_MESSAGE);
    } catch (e) {
      logger.error(e+ ' Medicamentos Controller::handleDelete');
      return res.status(404).json(constant.ERROR_MESSAGE);
    }
  }
};

module.exports = MedicinesController;
