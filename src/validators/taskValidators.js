const { body, param } = require('express-validator');
const { validate } = require('../helpers/validate');

const allowedStatuses = ['Pending', 'In Progress', 'Done'];

const createTaskValidation = validate([
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('details').optional().trim(),
  body('assignee').notEmpty().withMessage('Assignee project is required').isMongoId().withMessage('Valid project id is required'),
  body('status').optional().isIn(allowedStatuses).withMessage('Invalid task status'),
]);

const updateTaskValidation = validate([
  param('taskId').isMongoId().withMessage('Valid task id is required'),
  body('title').optional().trim().notEmpty().withMessage('Task title is required'),
  body('details').optional().trim(),
  body('assignee').optional().isMongoId().withMessage('Valid project id is required'),
  body('status').optional().isIn(allowedStatuses).withMessage('Invalid task status'),
]);

const deleteTaskValidation = validate([
  param('taskId').isMongoId().withMessage('Valid task id is required'),
]);

module.exports = {
  createTaskValidation,
  deleteTaskValidation,
  updateTaskValidation,
};
