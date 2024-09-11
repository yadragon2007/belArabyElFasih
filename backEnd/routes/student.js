import { Router } from "express";
const router = Router();

import authorization from "../middleware/authorization.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import studentsValidator from "../validator/studentsValidator.js";
import studentController from "../controller/studentController.js";

// @route   POST api/student/
// @desc    Create an student
// @access  Public
router.post(
  "/",
  authorization.UserAuthorization,
  studentsValidator.addStudent,
  localValidationFunction.errorHandler,
  studentController.addStudent_post
);

// @route   GET api/student/
// @desc    get all Students
// @access  Public
router.get(
  "/",
  authorization.UserAuthorization,
  studentController.getAllStudents_get
);

// @route   GET api/student/:code
// @desc    student code
// @access  Public
router.get(
  "/:code",
  authorization.UserAuthorization,
  studentController.studentCode_get
);

// @route   GET api/student/:code/public
// @desc    student code
// @access  Public
router.get(
  "/:code/public",
  studentController.studentCode_get
);


// @route   PUT api/student/:code
// @desc    update an student
// @access  Public
const updateStudentProprities = [
  "fullName",
  "phone",
  "GuardianPhone",
  "grade",
  "school",
  "code",
  "userId",
];
router.put(
  "/",
  authorization.UserAuthorization,
  localValidationFunction.validateBodyProperties(updateStudentProprities),
  studentsValidator.updateStudent,
  localValidationFunction.errorHandler,
  studentController.updateStudent_put
);
// @route   DELETE api/student/:code
// @desc    delete student
// @access  Public
router.delete(
  "/:code",
  authorization.UserAuthorization,
  studentController.deleteStudent_delete
);
export default router;
