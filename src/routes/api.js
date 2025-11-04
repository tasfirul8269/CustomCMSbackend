const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
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

// Create (moderators with write can add), Update/Delete (admin only)
certificateRouter.post('/', authorizePermission('certifications', 'write'), certificateController.create);
certificateRouter.patch('/:id', authorize('admin'), certificateController.update);
certificateRouter.delete('/:id', authorize('admin'), certificateController.delete);

router.use('/certificates', certificateRouter);

for (const [resource, model] of Object.entries(models)) {
  const resourceRouter = express.Router();
  const controller = createCRUDController(model);

  resourceRouter.use(auth);

  // Read operations
  resourceRouter.get('/', authorizePermission(resource, 'read'), controller.getAll);
  resourceRouter.get('/:id', authorizePermission(resource, 'read'), controller.getById);

  // Create (moderators with write can add), Update/Delete (admin only)
  resourceRouter.post('/', authorizePermission(resource, 'write'), controller.create);
  resourceRouter.patch('/:id', authorize('admin'), controller.update);
  resourceRouter.delete('/:id', authorize('admin'), controller.delete);

  router.use(`/${resource}`, resourceRouter);
}

module.exports = router; 
