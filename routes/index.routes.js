const indexRoutes = require("express").Router();

const userRoutes = require("./user/user.routes");
const contentPublicRoutes = require("./content/content.public.routes");

const authenticate = require("../middleware/authentication.midleware");

const contentRoutes = require("./content/content.routes");
const userAuthenticatedRoutes = require("./user/user.authenticated");

indexRoutes.use("/user", userRoutes);
indexRoutes.use("/content", contentPublicRoutes);

indexRoutes.use(authenticate);

indexRoutes.use("/content", contentRoutes);
indexRoutes.use("/user", userAuthenticatedRoutes);

module.exports = indexRoutes;
