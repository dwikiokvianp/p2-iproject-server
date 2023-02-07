const indexRoutes = require("express").Router();

const userRoutes = require("./user/user.routes");

indexRoutes.use("/user", userRoutes);

module.exports = indexRoutes;
