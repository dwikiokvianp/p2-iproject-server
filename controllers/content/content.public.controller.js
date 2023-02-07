const { Content, Topic } = require("../../models");

class ContentPublicController {
  static async getAllContent(req, res, next) {
    try {
      const contents = await Content.findAll({
        include: {
          model: Topic,
          attributes: ["name"],
        },
        where: {
          contentType: "public",
        },
      });
      res.status(200).json(contents);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ContentPublicController;
