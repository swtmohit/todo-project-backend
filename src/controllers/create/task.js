const { Project, Task } = require('../../models');

const allowedStatuses = ['Pending', 'In Progress', 'Done'];

const createTask = async (req, res, next) => {
  try {
    const { title, details = '', assignee, status = 'Pending' } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task status',
      });
    }

    const project = await Project.findOne({
      _id: assignee,
      createdBy: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Selected project not found',
      });
    }

    const task = await Task.create({
      title,
      details,
      assignee: project._id,
      status,
      createdBy: req.user._id,
    });

    await task.populate('assignee', 'name description');

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createTask;
