import mongoose from "mongoose";
import { DB_URI } from '../config/index.js';

mongoose.connection.on("connected", () => {
    console.log("DB Connected...");
})

mongoose.connection.on("disconnected", () => {
    console.log("DB Disonnected ..x..x..x..");
})

export default async function connection() {
    try{
        await mongoose.connect(DB_URI);
    }catch(err){
        next(err);
    }
}