const { Project, Task } = require('../../models');

const deleteProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOneAndDelete({
      _id: projectId,
      createdBy: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    await Task.deleteMany({
      assignee: project._id,
      createdBy: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProject;
