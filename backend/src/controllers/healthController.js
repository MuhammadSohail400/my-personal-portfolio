// @desc    Get server health status
// @route   GET /api/health
// @access  Public
const getHealthStatus = (req, res) => {
  return res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Backend server is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

module.exports = {
  getHealthStatus,
};
