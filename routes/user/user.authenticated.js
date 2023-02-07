const userAuthenticatedRoutes = require("express").Router();

const userAuthenticatedController = require("../../controllers/user/user.authenticated.controller");

userAuthenticatedRoutes.post(
  "/:targetId",
  userAuthenticatedController.followOtherUser
);

module.exports = userAuthenticatedRoutes;
