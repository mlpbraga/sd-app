const examsFormatter = require('../../model/exams');
const examDao = require('../../dao/exams-dao');
const userDao = require('../../dao/user-dao');
const logger = require('./../../utils/logs');
const constant = require('./../../utils/constants');
const uuidv1 = require('uuid/v1');
const _ = require('lodash');

const ExamsController = {
  async handleGet(req, res, next) {
    req.context = 'exams';
    logger.request(req);
    try {
      let data;
      let exams;
      const { 
        userid,
        examid,
      } = req.query;
      if (userid && examid) {
        exams = await examDao.readExam(userid, examid);
      } else if (userid) {
        exams = await examDao.readAll(userid);
      }
      data = !_.isEmpty(exams) ? exams : [];
      // const data = examsFormatter.format(req.query);
      if (_.isEmpty(data)) {
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Consulta realizada com sucesso!');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e + ' Exames Controller::handleGet');

      // error handler middleware
      return next(e);
    }
  },
  async handlePost(req, res, next) {
    req.context = 'exams';
    logger.request(req);
    try {
      const { userid } = req.query;
      const { exam } = req.body;
      exam._id = uuidv1();
      const data = examsFormatter.formatOne(exam);
      await examDao.add(userid,data);
      if (!data) {
        logger.ok('Erro ao inserir exame.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Exame inserido com sucesso!');
        return res.status(200).json({...constant.INSERT_MESSAGE, data});
      }
    } catch (e) {
      logger.error(e+ ' Exames Controller::handlePost');
      return next(e);
    }
  },
  async handlePut(req, res, next) {
    req.context = 'exams';
    logger.request(req);
    try {
      const { userid, examid } = req.query;
      const { exam } = req.body;
      exam._id = examid;
      const exams = await examDao.updateExam(userid, examid, exam);
      const data = !_.isEmpty(exam) ? examsFormatter.formatOne(exams) : {}
      if (!data) {
        logger.error('Erro ao alterar o exame');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Exame alterado com sucesso.');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e+ ' Exames Controller::handlePut');
      return next(e);
    }
  },
  async handleDelete(req, res, next) {
    req.context = 'exams';
    logger.request(req);
    try {
      const { userid, examid } = req.query;
      await examDao.deleteExam(userid, examid);
      return res.status(200).json(constant.DELETE_MESSAGE);
    } catch (e) {
      logger.error(e+ ' Exames Controller::handleDelete');
      return res.status(404).json(constant.ERROR_MESSAGE);
    }
  }
};

module.exports = ExamsController;
