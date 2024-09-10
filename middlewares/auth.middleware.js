exports.auth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).redirect(`/login?message=Please login first`);
  }

  next();
};
