module.exports = function (req, res, next) {
  if (!Boolean(req.user)) {
    return res.status(401).json({message: 'Unauthorized'});
  }
  next();
};
