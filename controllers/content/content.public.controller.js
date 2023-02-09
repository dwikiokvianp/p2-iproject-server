const { Content, Topic, User } = require("../../models");

const axios = require("axios").default;

class ContentPublicController {

  static async getAllTopics(req, res, next) {
    try {
      console.log('masuk')
      const data = await Topic.findAll({atributes: ['name']})
      res.status(200).json(data)
    } catch (err) {
      next(err);
    }
  }

  static async getContentById(req, res, next) {
    try {
      const { id } = req.params;
      const content = await Content.findOne({
        where: {
          id,
        },
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

  static async summarizeParagraph(req, res, next) {
    try {
      const { id } = req.params;
      const content = await Content.findOne({
        where: {
          id,
        },
      });
      if (!content) throw { name: "ContentNotFound" };
      const { contentFill } = content;
      const options = {
        method: "POST",
        url: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-text/",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "b3e9d28835msh33d0c98aafe7148p155487jsn613f84175c84",
          "X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
        },
        data: `{"text": ${JSON.stringify(contentFill)}}`,
      };

      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = ContentPublicController;
