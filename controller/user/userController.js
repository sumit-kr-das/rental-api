import UserSchema from "../../models/UserSchema";
import customErrorHandler from "../../services/customErrorHandler";
import bcrypt from 'bcrypt';

const userController = {
    async updateUserPassword(req,res,next) {
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            await UserSchema.findByIdAndUpdate(req.params.id, { password: hash}, { new: true });
            res.status(200).json({ msg: "Password has been chenged"});
        }catch(err) {
           next(customErrorHandler.wrongCredentials());
        }
    },
    async deleteUser(req,res,next) {
        try{
            await UserSchema.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Your account has been deleted"});
        }catch(err) {
            next(err);
        }
    },
    async getUser(req,res,next) {
        try{
            const userData = await UserSchema.findById(req.params.id);
            const { password, __v, ...other} = userData._doc; 
            res.status(200).json(other);
        }catch(err) {
            next(err);
        }
    },
    async getAllUser(req,res,next) {
        try{
            const allUser = await UserSchema.find();
            res.status(200).json(allUser);
        }catch(err){
            next(err);
        }
    }
}

export default userController;