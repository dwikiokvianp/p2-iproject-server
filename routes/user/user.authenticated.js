const userAuthenticatedRoutes = require("express").Router();

const userAuthenticatedController = require("../../controllers/user/user.authenticated.controller");

userAuthenticatedRoutes.post("/payment", userAuthenticatedController.payment);
userAuthenticatedRoutes.get("/premium", userAuthenticatedController.premium);

userAuthenticatedRoutes.patch(
  "/status",
  userAuthenticatedController.updateStatusMember
);

userAuthenticatedRoutes.get(
  "/followers",
  userAuthenticatedController.getFollowers
);

userAuthenticatedRoutes.get(
  "/following",
  userAuthenticatedController.getFollowing
);

userAuthenticatedRoutes.post(
  "/:targetId",
  userAuthenticatedController.followOtherUser
);

module.exports = userAuthenticatedRoutes;
