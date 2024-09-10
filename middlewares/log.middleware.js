exports.log = (req, res, next) => {
  // req.session.user
  // req.body
  // req.query
  // req.params
  // req.url
  // req.ip
  // ....
  // do logging
  console.log(req);
  next();
};
