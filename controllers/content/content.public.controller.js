const { Content, Topic, User } = require("../../models");

class ContentPublicController {
  static async getContentById(req, res, next) {
    try {
      const { id } = req.params;
      const content = await Content.findOne({
        where: {
          id,
        },
      });
      if (!content) throw { name: "ContentNotFound" };
      res.status(200).json(content);
    } catch (err) {
      next(err);
    }
  }

  static async getAllContent(req, res, next) {
    try {
      const contents = await Content.findAll({
        include: [
          {
            model: Topic,
            attributes: ["name"],
          },
          {
            model: User,
            attributes: ["name", "job"],
          },
        ],
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
