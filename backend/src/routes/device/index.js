const { Router } = require('express');
// const { celebrate } = require('celebrate');

// const joiSchema = require('./validation');
const deviceController = require('../../controllers/device');

const router = new Router({ mergeParams: true });

// const joiOptions = {
//   allowUnknown: true,
// };

// const validateMiddleware = (req, res, next) => {
//   celebrate(joiSchema, joiOptions)(req, res, next);
// };

router.get(
  '/create',
  deviceController.handleCreate,
);

router.get(
  '/',
  deviceController.handleGet,
);

router.post(
  '/',
  deviceController.handlePost,
);

router.put(
  '/',
  deviceController.handlePut,
);

router.delete(
  '/',
  deviceController.handleDelete,
);

module.exports = router;
