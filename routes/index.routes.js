const indexRoutes = require("express").Router();

const userRoutes = require("./user/user.routes");
const contentPublicRoutes = require("./content/content.public.routes");

const authenticate = require("../middleware/authentication.midleware");

const contentRoutes = require("./content/content.routes");

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/content", contentPublicRoutes);

indexRoutes.use(authenticate);

indexRoutes.use("/content", contentRoutes);

module.exports = indexRoutes;
