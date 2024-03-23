import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDNARY_API_KEY,
  CLOUDNARY_API_SECRET,
  CLOUDNARY_NAME,
} from "../config/index.js";

cloudinary.config({
  cloud_name: CLOUDNARY_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECRET,
});

export const uploadOnCloudnary = async (loaclPath) => {
  try {
    if (!loaclPath) {
      return null;
    }
    const res = await cloudinary.uploader.upload(loaclPath, {
      resource_type: "auto",
    });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const destroyOnCloudnary = async (cloudnaryPath) => {
  try {
    if (!cloudnaryPath) {
      return null;
    }
    const res = await cloudinary.uploader.destroy(cloudnaryPath);
    return res;
  } catch (err) {
    return null;
  }
};
