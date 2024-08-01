import axios from "axios";
import Cookie from "cookie-universal";
const cookies = Cookie();

const Axios = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: process.env.DOMAIN,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + cookies.get("Token"),
  },
});

export default Axios;
