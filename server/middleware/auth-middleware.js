/**
 * Middleware that checks whether or not the user is logged in
 * @param req - The request
 * @param res - The response
 * @param next - Next route
 */
module.exports = function checkAuth(req, res, next) {
  if (!req.session || !req.session.user_id) {
    res.render('403');
  } else {
    next();
  }
};