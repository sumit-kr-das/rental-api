import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  DB_URI,
  SALT_ROUND,
  JWT_SECRET,
  ORIGIN,
  CLOUDNARY_NAME,
  CLOUDNARY_API_KEY,
  CLOUDNARY_API_SECRET,
} = process.env;
