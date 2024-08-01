import axios from "axios";
import Cookie from "cookie-universal";
import env from "dotenv";
env.config();
const cookies = Cookie();

const Axios = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + cookies.get("Token"),
  },
});

export default Axios;
