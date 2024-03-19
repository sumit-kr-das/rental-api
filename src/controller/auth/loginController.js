import User from "../../models/User.js";
import customErrorHandler from "../../services/customErrorHandler.js";
import { JWT_SECRET } from "../../config/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginController = {
  async login(req, res, next) {
    const { email } = req.body;
    try {
      const isExist = await User.findOne({ email });
      if (!isExist) {
        return next(customErrorHandler.wrongCredentials());
      }
      const isPassCorrect = await bcrypt.compareSync(
        req.body.password,
        isExist.password
      );
      if (!isPassCorrect) {
        return next(customErrorHandler.wrongCredentials());
      }
      const generateToken = jwt.sign(
        {
          id: isExist._id,
          role: isExist.role,
        },
        JWT_SECRET,
        { expiresIn: "3d" }
      );

      // const { password, isAdmin, ...otherDetails } = isExist._doc;

      res.status(200).json({
        success: true,
        message: "Login Successfull",
        user: {
          name: isExist.name,
          role: isExist.role,
          access_token: generateToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

export default loginController;
