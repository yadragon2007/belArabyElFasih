import Accounts from "../models/accountsModel.js";
import envConfig from "../config/envConfigrations.js";
import bcrypt from "bcrypt";

const checkIfAdminIsExist = async (req, res, next) => {
  try {
    const admin = await Accounts.findOne({ admin: true });
    if (admin) return next();
    else addAdmin(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error,
    });
  }
};

const addAdmin = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(envConfig.admin.password, 10);

    const account = new Accounts({
      fullName:"Amr Gamal",
      userName: envConfig.admin.username,
      password: hashedPassword,
      admin: true,
    });
    await account.save();
    return next();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error,
    });
  }
};

export default checkIfAdminIsExist;
