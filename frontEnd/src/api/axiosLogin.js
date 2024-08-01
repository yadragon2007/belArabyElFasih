import axios from "axios";
import Cookie from "cookie-universal";
import env from "dotenv";
env.config();
const cookies = Cookie();

const AxiosLogin = axios.create({
  baseURL: process.env.DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosLogin;
