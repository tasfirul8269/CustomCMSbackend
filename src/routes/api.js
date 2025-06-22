const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { authorizePermission } = require('../middleware/auth');
const createCRUDController = require('../controllers/crudController');
const certificateController = require('../controllers/certificateController');

const models = {
  students: require('../models/Student'),
  courses: require('../models/Course'),
  batches: require('../models/Batch'),
  certificates: require('../models/Certificate'),
  employees: require('../models/Employee'),
  vendors: require('../models/Vendor'),
  locations: require('../models/Location'),
};

// Special route for certificates using its own controller
const certificateRouter = express.Router();
certificateRouter.use(auth, authorizePermission('certificates'));
certificateRouter.post('/', certificateController.create);
certificateRouter.get('/', certificateController.getAll);
certificateRouter.get('/:id', certificateController.getById);
certificateRouter.patch('/:id', certificateController.update);
certificateRouter.delete('/:id', certificateController.delete);
router.use('/certificates', certificateRouter);

for (const [resource, model] of Object.entries(models)) {
  const resourceRouter = express.Router();
  const controller = createCRUDController(model);

  resourceRouter.use(auth, authorizePermission(resource));

  resourceRouter.post('/', controller.create);
  resourceRouter.get('/', controller.getAll);
  resourceRouter.get('/:id', controller.getById);
  resourceRouter.patch('/:id', controller.update);
  resourceRouter.delete('/:id', controller.delete);

  router.use(`/${resource}`, resourceRouter);
}

module.exports = router; 