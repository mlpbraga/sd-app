const { Router } = require('express');
// const { celebrate } = require('celebrate');

const joiSchema = require('./validation');
const examsController = require('../../controllers/exams');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

// const validateMiddleware = (req, res, next) => {
//   celebrate(joiSchema, joiOptions)(req, res, next);
// };

router.get(
  '/',
  examsController.handleGet,
);

router.post(
  '/',
  examsController.handlePost,
);

router.put(
  '/',
  examsController.handlePut,
);

router.delete(
  '/',
  examsController.handleDelete,
);

module.exports = router;
