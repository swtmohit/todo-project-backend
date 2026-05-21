const express = require('express');
const createTask = require('../controllers/create/task');
const deleteTask = require('../controllers/delete/task');
const retrieveTasks = require('../controllers/retrieve/task');
const updateTask = require('../controllers/update/task');
const { protect } = require('../middleware/authMiddleware');
const { createTaskValidation, deleteTaskValidation, updateTaskValidation } = require('../validators/taskValidators');

const router = express.Router();

router.use(protect);

router.post('/task', createTaskValidation, createTask);
router.get('/task', retrieveTasks);
router.patch('/task/:taskId', updateTaskValidation, updateTask);
router.delete('/task/:taskId', deleteTaskValidation, deleteTask);

module.exports = router;
