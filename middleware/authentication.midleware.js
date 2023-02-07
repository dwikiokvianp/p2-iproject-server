const { verifyToken } = require("../helpers/token");

const authenticate = (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthorized" };

    req.user = verifyToken(access_token);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
