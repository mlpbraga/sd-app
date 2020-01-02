const usersFormatter = require('../../model/users');
const logger = require('./../../utils/logs');
const constant = require('./../../utils/constants');
const User = require('../../dao/index');
const userDao = require('../../dao/user-dao');
const _ = require('lodash');

const UsersController = {
  async handleGet(req, res, next) {
    req.context = 'users';
    logger.request(req);
    try {
      let data;
      if (req.query.id) {
        const user = await userDao.readUser(req.query.id);
        data = !_.isEmpty(user) ? usersFormatter.formatGetById(user) : [];
      } else {
        const users = await userDao.readAll();
        data = !_.isEmpty(users) ? usersFormatter.formatGet(users) : [];
      }
      if (_.isEmpty(data)) {
        logger.error('Falha ao realizar consulta.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Consulta realizada com sucesso!');
        return res.status(200).json(data);
      }
    } catch (e) {
      logger.error(e + ' Usuarios Controller::handleGet');
      return next(e);
    }
  },
  async handlePost(req, res, next) {
    req.context = 'users';
    logger.request(req);
    try {
      const newUser = new User({
        ...req.body,
        paciente: {
          medicamentos: [],
          exames: [],
        }
      });
      await newUser.save();

      const data = usersFormatter.formatPostResponse(newUser);
      await newUser.save();
      logger.ok('Usuário criado com sucesso!');
      return res.status(200).json({...constant.INSERT_MESSAGE, data});
    } catch (e) {
      logger.error(e+ ' Usuarios Controller::handlePost')
      return res.status(404).json(constant.ERROR_MESSAGE);
    }
  },
  async handlePut(req, res, next) {
    req.context = 'users';
    logger.request(req);
    try {
      let data;
      const { id } = req.query;
      const user = { ...req.body };
      await userDao.updateUser(id, user); 
      data = usersFormatter.formatGetById(user);
      if (!data) {
        logger.error('Falha ao realizar alteração.');
        return res.status(404).json(constant.ERROR_MESSAGE);
      } else {
        logger.ok('Usuário alterado com sucesso.');
        return res.status(200).json(constant.UPDATE_MESSAGE);
      }
    } catch (e) {
      logger.error(e+ ' Usuarios Controller::handlePut');
      return next(e);
    }
  },
  async handleDelete(req, res, next) {
    req.context = 'users';
    logger.request(req);
    try {
      let data;
      const { id } = req.query;
      await userDao.deleteUser(id);
      logger.ok('Usuário excluído com sucesso');
      return res.status(200).json(constant.DELETE_MESSAGE);
    } catch (e) {
      logger.error(e+ ' Usuarios Controller::handleDelete');
      return res.status(404).json(constant.ERROR_MESSAGE);
    }
  },
  async handleLogin(req, res, next) {
    req.context = 'users';
    logger.request(req);
    try {
      const {
        login,
        senha,
      } = req.body;
      const users = await userDao.readAll();
      const selected = _.filter(users, {username: login});
      if (_.isEmpty(selected)) return res.status(404).json(constant.USER_NOT_FOUND);
      else if (selected[0].password !== senha) return res.status(404).json(constant.INVALID_PASSWORD);
      else {
        logger.ok('Login realizado com sucesso.');
        return res.status(200).json({ _id: selected[0]._id });
      }
    } catch (e) {
      logger.error(e + ' Usuarios Controller::handleLogin');
      return next(e);
    }
  }
};

module.exports = UsersController;
