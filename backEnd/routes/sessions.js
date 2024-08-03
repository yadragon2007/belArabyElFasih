import { Router } from "express";
const router = Router();

import authorization from "../middleware/authorization.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import sessionValidator from "../validator/sessionValidator.js";
import sessionController from "../controller/sessionController.js";

// @route   POST api/sessions/
// @desc    add session
// @access  Public
router.post(
  "/",
  authorization.UserAuthorization,
  sessionValidator.addSession,
  localValidationFunction.errorHandler,
  sessionController.addClass_post
);

// @route   GET api/sessions/
// @desc    get all sessions
// @access  Public
router.get(
  "/",
  authorization.UserAuthorization,
  sessionController.getAllClasses_get
);

// @route   GET api/sessions/:sessionId
// @desc    get session
// @access  Public
router.get(
  "/:sessionId",
  authorization.UserAuthorization,
  sessionValidator.getSession,
  localValidationFunction.errorHandler,
  sessionController.getAnClass_get
);

// @route   DELETE api/sessions/
// @desc    delete session
// @access  Public
router.delete(
  "/:sessionId",
  authorization.UserAuthorization,
  sessionValidator.deleteSession,
  localValidationFunction.errorHandler,
  sessionController.deleteClass_delete
);

// @route   PUT api/sessions/
// @desc    update session data
// @access  Public

const updateSessionProperties = [
  "day",
  "hour",
  "min",
  "AmPm",
  "grade",
  "userId",
  "sessionId",
];

router.put(
  "/",
  authorization.UserAuthorization,
  localValidationFunction.validateBodyProperties(updateSessionProperties),
  sessionValidator.updateSession,
  localValidationFunction.errorHandler,
  sessionController.updateClass_put
);

// @route   PATCH api/sessions/active
// @desc    active session
// @access  Public

router.patch(
  "/active",
  authorization.UserAuthorization,
  sessionValidator.activeSession,
  localValidationFunction.errorHandler,
  sessionController.activeSession_patch
);

// @route   POST api/sessions/add/sutdent
// @desc    add student to a session
// @access  Public

router.post(
  "/add/sutdent",
  authorization.UserAuthorization,
  sessionValidator.addStudent,
  localValidationFunction.errorHandler,
  sessionController.addStudentToSession_post
);

export default router;
