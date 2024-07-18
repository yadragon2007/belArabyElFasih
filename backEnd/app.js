import express from "express";
const app = express();
// cors
import cors from "cors";
app.use(cors());

// dotenv
import envConfigrations from "./config/envConfigrations.js";
const { dataBase } = envConfigrations;

// connect to dataBase
import mongoose from "mongoose";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    `mongodb+srv://${dataBase.userName}:${dataBase.password}@cluster0.skzhcxy.mongodb.net/belArabyElFasi7?retryWrites=true&w=majority&appName=Cluster0`
  );
}

// cookies
import cookieParser from "cookie-parser";
app.use(cookieParser());

// body parser
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// check If Admin Is Exist
import addAdminAccount from "./middleware/addAdminAccount.js";
app.use(addAdminAccount);
// routes
import accounts from "./routes/accounts.js";
app.use("/api/accounts", accounts);

app.use((req, res) => {
  res.status(404).json({
    error: "404",
    message: "Not Found",
  });
});

app.listen(8080, () => {
  console.log("http://localhost:8080/");
});
