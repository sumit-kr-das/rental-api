import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
},{ timestamps: true });

userSchema.pre("save", async function(next:any) {
    let user = this as UserDocument;

    if(user.isModified('password')){
        return next;
    }

    const salt = await bcrypt.genSalt(config.get<number>('salt'));
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
})

userSchema.methods.comparePassword =async function (candidatePassword:string): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch(e => false);
}

const User = mongoose.model("User", userSchema, "users");
export default User;