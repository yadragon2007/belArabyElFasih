import { Router } from "express";
const router = Router();

import authorization from "../middleware/authorization.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import studentsValidator from "../validator/studentsValidator.js";
import studentController from "../controller/studentController.js";

// @route   PSOT api/student/
// @desc    Create an student
// @access  Public
router.post(
  "/",
  authorization.UserAuthorization,
  studentsValidator.addStudent,
  localValidationFunction.errorHandler,
  studentController.addStudent_post
);

// @route   GET api/student/:code
// @desc    student code
// @access  Public
router.get(
  "/:code",
  authorization.UserAuthorization,
  studentController.studentCode_get
);

export default router;
