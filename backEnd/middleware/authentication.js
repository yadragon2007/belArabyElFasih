import bcrypt from "bcrypt";
import envConfigrations from "../config/envConfigrations.js";
import Accounts from "../models/accountsModel.js";

const Authentication = async (req, res, next) => {
  let { userName, password } = req.body;
  const { admin } = envConfigrations;

  try {
    const account = await Accounts.findOne({ userName });
    if (!account) return res.status("401").send("Invalid userName or password");
    const check = await bcrypt.compare(password, account.password);
    if (!check) return res.status("401").send("Invalid userName or password");
    req.body.id = account.id;
    next();
  } catch (error) {
    res.status(500).send({ type: "authentication", message: error });
  }
};

export default {
  Authentication,
};
