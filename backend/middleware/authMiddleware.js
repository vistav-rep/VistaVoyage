const attachSystemUser = async (req, res, next) => {
  if (!req.user) {
    req.user = { _id: null, role: 'ADMIN', name: 'System' };
  }
  next();
};

module.exports = { attachSystemUser };
