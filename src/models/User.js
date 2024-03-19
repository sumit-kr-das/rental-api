import mongoose from "mongoose";

const reqString = { type: String, required: true };

export const roles = {
  USER: "user",
  HOTEL: "hotel",
  ADMIN: "admin",
};

const UserSchema = new mongoose.Schema(
  {
    name: reqString,
    email: { type: String, required: true, unique: true },
    password: reqString,
    role: { type: String, default: roles.USER },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "users");
export default User;
