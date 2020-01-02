const { Router } = require('express');
// const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
const medicinesController = require('../../controllers/medicines');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

// const validateMiddleware = (req, res, next) => {
//   celebrate(joiSchema, joiOptions)(req, res, next);
// };

router.get(
  '/',
  medicinesController.handleGet,
);

router.post(
  '/',
  medicinesController.handlePost,
);

router.put(
  '/',
  medicinesController.handlePut,
);

router.delete(
  '/',
  medicinesController.handleDelete,
);

module.exports = router;
