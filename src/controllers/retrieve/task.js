const { Task } = require('../../models');

const retrieveTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id })
      .populate('assignee', 'name description')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = retrieveTasks;
