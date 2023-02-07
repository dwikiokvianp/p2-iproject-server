const { User, Follower } = require("../../models");

class UserAuthenticatedController {
  static async followOtherUser(req, res, next) {
    try {
      const { targetId } = req.params;
      const { id } = req.user;
      console.log("tertriger");
      const user = await User.findByPk(id);
      if (!user) throw { name: "UserNotFound" };
      const targetUser = await User.findByPk(targetId);
      if (!targetUser) throw { name: "UserNotFound" };

      const isFollowed = await Follower.findOne({
        where: {
          UserId: id,
          TargetId: targetId,
        },
      });
      if (isFollowed) throw { name: "AlreadyFollowed" };

      await Follower.create({
        UserId: id,
        TargetId: targetId,
      });
      res.status(201).json({ message: "Successfully follow someone" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserAuthenticatedController;
