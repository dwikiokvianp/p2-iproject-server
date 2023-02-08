const contentPublicRoutes = require("express").Router();

const ContentController = require("../../controllers/content/content.public.controller");

contentPublicRoutes.get("/", ContentController.getAllContent);
contentPublicRoutes.get("/:id", ContentController.getContentById);

module.exports = contentPublicRoutes;
