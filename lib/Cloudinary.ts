import { v2 as cloudinary } from "cloudinary";

let isConnect = false;
const connectCloudinary = async () => {
  if (isConnect) {
    return;
  } else {
    try {
      await cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
      });
      isConnect = true;
      console.log("cloudinary is connected");
    } catch (error) {
      console.log(error);
      console.log("cloudinary is not connected");
    }
  }
};

export default connectCloudinary;
