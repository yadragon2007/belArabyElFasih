import { body, validationResult } from "express-validator";
import Assistants from "../models/accountsModel.js";
import envConfigrations from "../config/envConfigrations.js";

const validateSignup = [
  // name validation
  body("userName")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("userName cannot be empty")

    .custom(async (userName) => {
      const user = await Assistants.findOne({ userName });
      if (user || userName == envConfigrations.admin.username) {
        return Promise.reject(new Error("userName is in use"));
      }
    }),
  // password validation
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("password cannot be empty"),
];

const validateLogin = [
  body("userName").notEmpty().withMessage("userName cannot be empty"),
  // password validation
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("password cannot be empty"),
];
// const changePasswordByAdmin = [
//   body("id")
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("id is reqired")
//     .custom(async (id) => {
//       const user = await Accounts.findById(id);
//       if (!user) return Promise.reject(new Error("id is invalide"));
//     })
//     .withMessage("id is invalide"),

//   body("password")
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("password cannot be empty")
//     .isStrongPassword()
//     .withMessage("weak password"),
// ];

// const changePassword = [
//   body("oldPassword")
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("password cannot be empty"),
//   body("newPassword")
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("password cannot be empty")
//     .isStrongPassword()
//     .withMessage("weak password"),
//   body("confirmPassword")
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("password cannot be empty"),
// ];
// const getUser = [
//   body("userId")
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("Id cannot be empty"),
// ];

// const updateUser = [
//   // full name
//   body("fullName")
//     .optional()
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("name required"),
//   // email
//   body("email")
//     .optional()
//     .notEmpty({ ignore_whitespace: true })
//     .withMessage("email cannot be empty")
//     .isEmail()
//     .withMessage("email is invalid")
//     .normalizeEmail()
//     .custom(async (email) => {
//       const user = await Accounts.findOne({ email: email });
//       if (user) {
//         return Promise.reject(new Error("email is in use"));
//       }
//     })
//     .withMessage("email is in use"),
// ];

export default {
  validateSignup,
  validateLogin,
  // changePasswordByAdmin,
  // changePassword,
  // getUser,
  // updateUser,
};
