import dotenv from "dotenv";
dotenv.config();

export default {
  //   PORT: process.env.PORT || 5000,
  METADATA_SERVER_URL: process.env.METADATA_SERVER_URL as string,
  UPLOAD_SERVER_URL: process.env.UPLOAD_SERVER_URL as string,
  CLIENT_URL: process.env.CLIENT_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN as string,
  AUTH_URL: process.env.AUTH_URL as string
};
