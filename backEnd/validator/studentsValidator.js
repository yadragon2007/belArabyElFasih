import { body, validationResult } from "express-validator";
import Grades from "../models/gradesModel.js";
import Students from "../models/studentsModel.js";

const phonesArray = ["ar-EG"];

const addStudent = [
  body("fullName")
    .notEmpty()
    .withMessage("Full Name is required")
    .isString()
    .withMessage("Full Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Full Name must be at least 3 characters long"),
  body("grade")
    .notEmpty()
    .withMessage("Grade is required")
    .isString()
    .withMessage("Grade must be a string")
    .custom(async (id) => {
      const grade = await Grades.findById(id);
      if (!grade) Promise.reject(new Error("this grade is not exist"));
    }),
  body("school")
    .notEmpty()
    .withMessage("School is required")
    .isString()
    .withMessage("School must be a string"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string")
    .isMobilePhone(phonesArray),
  body("GuardianPhone")
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string")
    .isMobilePhone(phonesArray),
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .isInt({ min: 0 })
    .withMessage("Code must be a number")
    .custom(async (code) => {
      const student = await Students.findOne({ code: code });
      if (student) Promise.reject(new Erorr("this code is already exist"));
    }),
];

const updateStudent = [
  body("fullName")
    .notEmpty()
    .withMessage("Full Name is required")
    .isString()
    .withMessage("Full Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Full Name must be at least 3 characters long"),
  body("grade")
    .notEmpty()
    .withMessage("Grade is required")
    .isString()
    .withMessage("Grade must be a string")
    .custom(async (id) => {
      const grade = await Grades.findById(id);
      if (!grade) Promise.reject(new Error("this grade is not exist"));
    }),
  body("school")
    .notEmpty()
    .withMessage("School is required")
    .isString()
    .withMessage("School must be a string"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string")
    .isMobilePhone(phonesArray),
  body("GuardianPhone")
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string")
    .isMobilePhone(phonesArray),
  body("code")
    .notEmpty()
    .withMessage("Code is required")
    .isInt({ min: 0 })
    .withMessage("Code must be a number")
    .custom(async (code) => {
      const student = await Students.findOne({ code: code });
      if (!student) Promise.reject(new Erorr("this code is not exist"));
    }),
];

export default { addStudent, updateStudent };
