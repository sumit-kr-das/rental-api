import mongoose from "mongoose";

const reqString = { type: String, required: true };

const UserSchema = new mongoose.Schema({
    name: reqString,
    email: { type: String, required: true, unique: true },
    password: reqString,
    isAdmin: { type: Boolean, default: false }
},{ timestamps: true });

const User = mongoose.model("User", UserSchema, "users");
export default User;