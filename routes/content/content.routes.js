const contentRoutes = require("express").Router();

const ContentController = require("../../controllers/content/content.controller");

contentRoutes.post("/", ContentController.postContent);
contentRoutes.post("/:postId", ContentController.postComment);

module.exports = contentRoutes;
