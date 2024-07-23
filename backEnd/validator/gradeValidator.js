import { body, validationResult } from "express-validator";

const addGrade = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long"),
  body("sort")
    .notEmpty()
    .withMessage("Sort is required")
    .isNumeric()
    .withMessage("Sort must be a number"),
];
const deleteGrade = [
  body("gradeId")
    .notEmpty()
    .withMessage("Grade ID is required")
    .isString()
    .withMessage("Grade ID must be a string"),
];
export default {
  addGrade,
  deleteGrade,
};
