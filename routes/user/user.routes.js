const userRoutes = require("express").Router();

const userController = require("../../controllers/user.controller");

userRoutes.post("/login", userController.userLogin);
userRoutes.post("/register", userController.userRegister);

module.exports = userRoutes;
