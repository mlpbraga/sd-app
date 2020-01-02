const { Router } = require('express');
// const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
const usersController = require('../../controllers/users');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

router.post(
  '/',
  usersController.handleLogin,
);

module.exports = router;
