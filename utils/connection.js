import mongoose from "mongoose";
import { DB_URI } from "../config";

export default async function connection() {
    try{
        await mongoose.connect(DB_URI);
        console.log("DB Connected...");
    }catch(err){
        next(err);
    }
}