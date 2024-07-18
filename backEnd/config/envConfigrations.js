import dotenv from "dotenv";
dotenv.config();

export default {
  JWT: {
    secret: process.env.JWT_SECRET_KEY,
    expire: process.env.JWT_EXPIRE,
  },

  port: process.env.PORT,
  dataBase: {
    userName: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  admin:{
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  }
};
