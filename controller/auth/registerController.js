import UserSchema from '../../models/UserSchema.js';
import bcrypt from 'bcrypt';

const registerController = {
    async register(req,res,next) {
        const { name, email, password } = req.body;
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new UserSchema({ name, email, password: hash });
            await newUser.save();
            res.status(200).json({ msg: "User registered seccessfully" });
        }catch(err){
            next(err);
        }
    }
}

export default registerController;