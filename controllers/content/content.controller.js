const { Content, UserContent } = require("../../models");

class ContentController {

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
        },
      });
      res.status(200).json(contents);
    } catch (err) {
      next(err);
    }
  }


  static async postContent(req, res, next) {
    try {
      const UserId = req.user.id;
      const { title, contentFill, type, topic, hotline } = req.body;
      console.log(req.body)
      await Content.create({
        title,
        contentFill,
        contentType: type,
        hotline,
        TopicId: topic,
        UserId,
      });
      res.status(201).json({ message: "Content successfully created" });
    } catch (err) {
      console.log(err)
      res.send(err);
    }
  }

  static async postComment(req, res, next) {
    try {
      const UserId = req.user.id;
      const { postId } = req.params;
      const { comment } = req.body;
      console.log(postId, comment, UserId);

      const content = await Content.findOne({
        where: {
          id: postId,
        },
      });

      if (!content) throw { name: "ContentNotFound" };

      await UserContent.create({
        comment,
        UserId,
        ContentId: postId,
      });
      res.status(201).json({ message: "Comment successfully added" });
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = ContentController;
