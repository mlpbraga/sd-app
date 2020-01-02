const historyFormatter = require('../../model/history');
const logger = require('./../../utils/logs');
const constant = require('./../../utils/constants');
const _ = require('lodash');

const HistoryController = {
  async handleGet(req, res, next) {
    try {
      const data = historyFormatter.format(req.query);
      if (_.isEmpty(data)) {
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e + ' Historico Controller::handleGet');

      // error handler middleware
      return next(e);
    }
  },
  async handlePost(req, res, next) {
    try {
      const data = await historyFormatter.handlePost(req.body);
      if (!data) {
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e+ ' Historico Controller::handlePost');

      // error handler middleware
      return next(e);
    }
  },
  async handlePut(req, res, next) {
    try {
      const data = await historyFormatter.handlePut(req.body);
      if (!data) {
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e+ ' Historico Controller::handlePut');

      // error handler middleware
      return next(e);
    }
  },
  async handleDelete(req, res, next) {
    try {
      const data = await historyFormatter.handleDelete(req.query);
      if (!data) {
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e+ ' Historico Controller::handleDelete');

      // error handler middleware
      return next(e);
    }
  }
};

module.exports = HistoryController;
