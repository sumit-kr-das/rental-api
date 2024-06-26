import User from "../../models/User.js";
import { SALT_ROUND } from "../../config/index.js";
import bcrypt from "bcrypt";

const registerController = {
  async register(req, res, next) {
    const { name, email, password, role } = req.body;
    const saltRound = Number(SALT_ROUND);
    try {
      const salt = bcrypt.genSaltSync(saltRound);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({ name, email, password: hash, role });
      await newUser.save();
      res.status(200).json({
        success: true,
        message: "User registered seccessfully",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default registerController;
