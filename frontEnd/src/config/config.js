import env from "dotenv";
env.config();

export default {
  DOMAIN: process.env.DOMAIN,
  CYPTR_KEY: process.env.CYPTR_KEY

};
