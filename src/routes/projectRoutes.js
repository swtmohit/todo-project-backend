const express = require('express');
const createProject = require('../controllers/create/project');
const deleteProject = require('../controllers/delete/project');
const retrieveProjects = require('../controllers/retrieve/project');
const { protect } = require('../middleware/authMiddleware');
const { createProjectValidation, deleteProjectValidation } = require('../validators/projectValidators');

const router = express.Router();

router.use(protect);

router.post('/project', createProjectValidation, createProject);
router.get('/project', retrieveProjects);
router.delete('/project/:projectId', deleteProjectValidation, deleteProject);

module.exports = router;
