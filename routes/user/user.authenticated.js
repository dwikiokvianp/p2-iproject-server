const userAuthenticatedRoutes = require("express").Router();

const userAuthenticatedController = require("../../controllers/user/user.authenticated.controller");

userAuthenticatedRoutes.post("/payment", userAuthenticatedController.payment);

userAuthenticatedRoutes.patch(
  "/status",
  userAuthenticatedController.updateStatusMember
);
userAuthenticatedRoutes.post(
  "/:targetId",
  userAuthenticatedController.followOtherUser
);

module.exports = userAuthenticatedRoutes;
