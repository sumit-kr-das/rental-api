import User from '../../models/User.js';
import { SALT_ROUND } from '../../config/index.js';
import bcrypt from 'bcrypt';


const registerController = {
    async register(req,res,next) {
        const { name, email, password } = req.body;
        const saltRound = Number(SALT_ROUND);
        try{
            const salt = bcrypt.genSaltSync(saltRound);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({ name, email, password: hash });
            await newUser.save();

            res.status(200).json({ msg: "User registered seccessfully" });
        }catch(err){
            next(err);
        }
    }
}

export default registerController;