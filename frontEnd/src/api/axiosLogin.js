import axios from "axios";
import Cookie from "cookie-universal";
import env from "dotenv";
env.config();
const cookies = Cookie();

const AxiosLogin = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosLogin;
