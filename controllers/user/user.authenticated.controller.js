const { User, Follower } = require("../../models");

const midtransClient = require("midtrans-client");

const randomize = require("../../helpers/randomize");

class UserAuthenticatedController {
  static async followOtherUser(req, res, next) {
    try {
      const { targetId } = req.params;
      const { id } = req.user;

      if (+targetId === id) throw { name: "CannotFollowYourself" };

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

  static async updateStatusMember(req, res, next) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id);
      if (!user) throw { name: "UserNotFound" };
      const { statusMember } = user;
      if (statusMember === "premium") throw { name: "AlreadyPremium" };
      user.statusMember = "premium";
      await user.save();
      res
        .status(201)
        .json({ message: "Congratulations, now you become premium member" });
    } catch (err) {
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const id = req.user.id;
      console.log("terpanggil")
      const user = await User.findByPk(id);
      if (!user) throw { name: "UserNotFound" };
      const { statusMember } = user;
      if (statusMember === "premium") throw { name: "AlreadyPremium" };

      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const parameter = {
        transaction_details: {
          order_id: randomize(10),
          gross_amount: 100000,
        },
        credit_card: {
          secure: true,
        },
      };

      snap
        .createTransaction(parameter)
        .then((transaction) => {
          const transactionToken = transaction.token;
          res.status(201).json({ transactionToken });
        })
        .catch((err) => {
          res.send(err);
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserAuthenticatedController;
