const jwt = require("jsonwebtoken");

const superSecretKey = process.env.JWT_SECRET;
console.log(superSecretKey);
const generateToken = (payload) => jwt.sign(payload, superSecretKey);
const verifyToken = (token) => jwt.verify(token, superSecretKey);

module.exports = { generateToken, verifyToken };
