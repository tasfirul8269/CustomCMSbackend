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
certificateRouter.use(auth);

// Read operations
certificateRouter.get('/', authorizePermission('certifications', 'read'), certificateController.getAll);
certificateRouter.get('/:id', authorizePermission('certifications', 'read'), certificateController.getById);

// Write operations
certificateRouter.post('/', authorizePermission('certifications', 'write'), certificateController.create);
certificateRouter.patch('/:id', authorizePermission('certifications', 'write'), certificateController.update);
certificateRouter.delete('/:id', authorizePermission('certifications', 'write'), certificateController.delete);

router.use('/certificates', certificateRouter);

for (const [resource, model] of Object.entries(models)) {
  const resourceRouter = express.Router();
  const controller = createCRUDController(model);

  resourceRouter.use(auth);

  // Read operations
  resourceRouter.get('/', authorizePermission(resource, 'read'), controller.getAll);
  resourceRouter.get('/:id', authorizePermission(resource, 'read'), controller.getById);

  // Write operations
  resourceRouter.post('/', authorizePermission(resource, 'write'), controller.create);
  resourceRouter.patch('/:id', authorizePermission(resource, 'write'), controller.update);
  resourceRouter.delete('/:id', authorizePermission(resource, 'write'), controller.delete);

  router.use(`/${resource}`, resourceRouter);
}

module.exports = router; 