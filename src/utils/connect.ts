import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';
const dbUri = config.get<string>('dbUri');

mongoose.connection.on("connected", () => {
    logger.info(`DB Connected on ${dbUri}`);
})

mongoose.connection.on("disconnected", () => {
    logger.error("DB Disconnected ..x..x..x..");
})

mongoose.set("strictQuery", false);

export default async function connection() {
    try{
        await mongoose.connect(dbUri);
    }catch(err) {
        console.log("xxxx Error from database xxxx");
    }
}