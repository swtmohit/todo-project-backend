const { body, param } = require('express-validator');
const { validate } = require('../helpers/validate');

const createProjectValidation = validate([
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('description').trim().notEmpty().withMessage('Project description is required'),
]);

const deleteProjectValidation = validate([
  param('projectId').isMongoId().withMessage('Valid project id is required'),
]);

module.exports = {
  createProjectValidation,
  deleteProjectValidation,
};
