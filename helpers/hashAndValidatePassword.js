const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const validatePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = { hashPassword, validatePassword };
