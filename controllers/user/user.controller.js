const { User } = require("../../models");

const { generateToken } = require("../../helpers/token");
const { validatePassword } = require("../../helpers/hashAndValidatePassword");

class UserController {
  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body, "<<< req.body");
      if (!email) throw { name: "EmailIsEmpty" };
      if (!password) throw { name: "PasswordIsEmpty" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "InvalidCredentials" };

      const isPasswordValid = validatePassword(password, user.password);
      if (!isPasswordValid) throw { name: "InvalidCredentials" };

      const payload = {
        id: user.id,
        email: user.email,
        statusMember: user.statusMember,
      };

      const access_token = generateToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async userRegister(req, res, next) {
    try {
      const { name, email, password, job } = req.body;
      if (!name) throw { name: "NameIsEmpty" };
      if (!email) throw { name: "EmailIsEmpty" };
      if (!password) throw { name: "PasswordIsEmpty" };
      if (!job) throw { name: "JobIsEmpty" };

      const user = await User.create({
        name,
        email,
        password,
        job,
        statusMember: "regular",
      });
      const payload = {
        id: user.id,
        email: user.email,
        statusMember: user.statusMember,
      }
      res.status(201).json(payload);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
