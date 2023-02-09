const { verifyToken } = require("../helpers/token");

const authenticate = (req, res, next) => {
  try {
    console.log("masuk");
    const { access_token } = req.headers;
    if (!access_token) throw { name: "Unauthorized" };
    console.log(access_token);

    req.user = verifyToken(access_token);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
