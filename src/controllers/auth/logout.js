const logout = async (req, res) =>
  res.status(200).json({
    success: true,
    message: 'Logout successful.',
  });

module.exports = logout;
