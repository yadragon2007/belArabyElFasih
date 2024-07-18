import Accounts from "../models/accountsModel.js";
import jwt from "jsonwebtoken";
import envConfig from "../config/envConfigrations.js";
import Assistants from "../models/accountsModel.js";
const APIusers = {
  Accounts,
};
const AdminAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).json({
      type: "authorization",
      code: "00",
      message: "Missing authorization header",
    });
  } else {
    try {
      const token = authorization.split(" ")[1]; //retrieve the token part only
      // verify Token
      const decoded = jwt.verify(token, envConfig.JWT.secret);
      // check admin title
      if (!decoded.admin)
        return res.status(403).send({
          type: "authorization",
          code: "01",
          message: "user not authorized",
        });
      // get admin title
      const title = decoded.title;
      // check if user is exists
      const user = await Accounts.findById(decoded.id);
      if (!user)
        return res.status(403).send({
          type: "authorization",
          code: "02",
          message: "user is not exists",
        });

      // check if password has not changed after creating the Token
      // if (user.whenPasswordChanged) {
      //   const currentTimeStamp = parseInt(
      //     user.whenPasswordChanged.getTime() / 1000
      //   );

      //   if (currentTimeStamp > decoded.iat) {
      //     return res.status(403).send({
      //       type: "authorization",
      //       code: "03",
      //       message:
      //         "password had been changed after the Token created.login again",
      //     });
      //   }
      // }
      // Check User Role
      const role = user.admin;

      if (role) {
        req.body.userId = user._id;
        return next();
      } else {
        return res.status(403).send({
          type: "authorization",
          code: "04",
          message: "user does not have the permission to use this url",
        });
      }
      return next();
    } catch (error) {
      // server error
      res
        .status(403)
        .send({ type: "authorization", code: "06", message: error.message });
    }
  }
};

const UserAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).json({
      type: "authorization",
      code: "00",
      message: "Missing authorization header",
    });
  } else {
    try {
      const token = authorization.split(" ")[1]; //retrieve the token part only
      // verify Token
      const decoded = jwt.verify(token, envConfig.JWT.secret);
      // get admin title
      const title = decoded.title;
      // check if user is exists
      const user = await Accounts.findById(decoded.id);
      if (!user)
        return res.status(403).send({
          type: "authorization",
          code: "01",
          message: "user is not exists",
        });

      // check if password has not changed after creating the Token
      // if (user.whenPasswordChanged) {
      //   const currentTimeStamp = parseInt(
      //     user.whenPasswordChanged.getTime() / 1000
      //   );

      //   if (currentTimeStamp > decoded.iat) {
      //     return res.status(403).send({
      //       type: "authorization",
      //       code: "03",
      //       message:
      //         "password had been changed after the Token created.login again",
      //     });
      //   }
      // }
      req.body.userId = user._id;
      return next();
    } catch (error) {
      // server error
      res
        .status(403)
        .send({ type: "authorization", code: "02", message: error.message });
    }
  }
};

const activation = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    if (!token)
      return res.status(401).send({
        type: "authorization",
        code: "01",
        message: "token is undefined",
      });

    // check if token in valid

    const decoded = jwt.verify(token, envConfig.Activation.secret);

    // check if the token id == user id

    if (id != decoded.id)
      return res.status(401).send({
        type: "authorization",
        code: "03",
        message: "this url is invalid",
      });

    // check if user exists

    const user = await Accounts.findById(id);
    if (!user)
      return res.status(401).send({
        type: "authorization",
        code: "04",
        message: "user isn`t exists",
      });

    // check if password has not changed after creating the Token

    if (user.whenPasswordChanged) {
      const currentTimeStamp = parseInt(
        user.whenPasswordChanged.getTime() / 1000
      );

      if (currentTimeStamp > decoded.iat) {
        return res.status(403).send({
          type: "authorization",
          code: "05",
          message: "password had been changed after the url sent. login again",
        });
      }
    }
    return next();
  } catch (error) {
    res
      .status(401)
      .send({ type: "authorization", code: "02", message: error.message });
  }
};

export default {
  AdminAuthorization,
  UserAuthorization,
  activation,
};
