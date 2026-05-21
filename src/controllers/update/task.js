const { Project, Task } = require('../../models');

const allowedStatuses = ['Pending', 'In Progress', 'Done'];

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { title, details, assignee, status } = req.body;

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task status',
      });
    }

    const updatePayload = {};

    if (title !== undefined) {
      updatePayload.title = title;
    }

    if (details !== undefined) {
      updatePayload.details = details;
    }

    if (assignee !== undefined) {
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

      updatePayload.assignee = assignee;
    }

    if (status !== undefined) {
      updatePayload.status = status;
    }

    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        createdBy: req.user._id,
      },
      updatePayload,
      {
        new: true,
        runValidators: true,
      },
    ).populate('assignee', 'name description');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateTask;
