import UserSchema from "../../models/UserSchema.js";
import customErrorHandler from "../../services/customErrorHandler.js";
import { JWT_SECRET } from "../../config/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const loginController = {
    async login(req, res, next) {
        const { email } = req.body;
        try{
            const isExist = await UserSchema.findOne({ email });
            if(!isExist) {
                return next(customErrorHandler.wrongCredentials());
            }

            const isPassCorrect = await bcrypt.compareSync(req.body.password, isExist.password);
            if(!isPassCorrect) {
                return next(customErrorHandler.wrongCredentials());
            }

            const generateToken = jwt.sign({
                id: isExist._id,
                isAdmin: isExist.isAdmin
            }, JWT_SECRET);

            const { password, isAdmin, ...otherDetails } = isExist._doc;

            res.cookie("access_token", generateToken, {
                httpOnly: true
            }).status(200).json(otherDetails);
        }catch(err){
            next(err);
        }
    }
}

export default loginController;