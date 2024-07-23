import { Router } from "express";
const router = Router();

import authorization from "../middleware/authorization.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import gradeValidator from "../validator/gradeValidator.js";
import gradesController from "../controller/gradesController.js";

// @route   POST api/grades/
// @desc    add a grade
// @access  Private
router.post(
  "/",
  authorization.AdminAuthorization,
  gradeValidator.addGrade,
  localValidationFunction.errorHandler,
  gradesController.addGrade_post
);
// @route   GET api/grades/
// @desc    get all grades
// @access  Public
router.get(
  "/",
  authorization.UserAuthorization,
  gradesController.getAllGrade_get
);
// @route   DELETE api/grades/
// @desc    delete a grade
// @access  Private
router.delete(
  "/",
  authorization.AdminAuthorization,
  gradeValidator.deleteGrade,
  localValidationFunction.errorHandler,
  gradesController.removeGrade_delete
);

export default router;
