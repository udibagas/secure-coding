exports.isAdmin = (req, res, next) => {
  if (req.session.role !== "admin") {
    return res
      .status(403)
      .redirect(`/login?message=You may not perform this action`);
  }

  next();
};
