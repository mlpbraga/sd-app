const { Router } = require('express');
// const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
const usersController = require('../../controllers/users');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

// const validateMiddleware = (req, res, next) => {
//   celebrate(joiSchema, joiOptions)(req, res, next);
// };

router.get(
  '/',
  usersController.handleGet,
);

router.post(
  '/',
  usersController.handlePost,
);

router.put(
  '/',
  usersController.handlePut,
);

router.delete(
  '/',
  usersController.handleDelete,
);

module.exports = router;
