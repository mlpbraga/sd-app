const { Router } = require('express');
// const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
const alarmsController = require('../../controllers/alarms');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

// const validateMiddleware = (req, res, next) => {
//   celebrate(joiSchema, joiOptions)(req, res, next);
// };

router.get(
  '/',
  alarmsController.handleGet,
);

router.post(
  '/',
  alarmsController.handlePost,
);

router.put(
  '/',
  alarmsController.handlePut,
);

router.delete(
  '/',
  alarmsController.handleDelete,
);

module.exports = router;
