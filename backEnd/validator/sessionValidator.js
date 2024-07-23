import { body, param, validationResult } from "express-validator";
import Grades from "../models/gradesModel.js";
import Sessions from "../models/sessionsModel.js";
import Accounts from "../models/accountsModel.js";
import Students from "../models/studentsModel.js";

const addSession = [
  body("day")
    .notEmpty()
    .withMessage("day is required")
    .isInt({ min: 0, max: 6 })
    .withMessage("day must be between 0 and 6"),
  body("hour")
    .notEmpty()
    .withMessage("hour is required")
    .isInt({ min: 1, max: 12 })
    .withMessage("hour must be between 0 and 23"),
  body("min")
    .notEmpty()
    .withMessage("min is required")
    .isInt({ min: 0, max: 59 })
    .withMessage("min must be between 0 and 59"),
  body("AmPm")
    .notEmpty()
    .withMessage("AmPm is required")
    .isIn(["AM", "PM"])
    .withMessage("AmPm must be AM or PM"),
  body("grade")
    .notEmpty()
    .withMessage("Grade is required")
    .isString()
    .withMessage("Grade must be a string")
    .isMongoId()
    .withMessage("Grade must be a valid Mongo ID")
    .custom(async (value) => {
      const grade = await Grades.findById(value);
      if (!grade) return Promise.reject(new Error("Grade does not exist"));
      else return;
    }),
];

const getSession = [
  param("sessionId")
    .notEmpty()
    .withMessage("sessionId is required")
    .isString()
    .withMessage("sessionId must be a string")
    .custom(async (id) => {
      const session = await Sessions.findById(id);
      if (!session) return Promise.reject(new Error("Session does not exist"));
    }),
];
const deleteSession = [
  body("sessionId")
    .notEmpty()
    .withMessage("sessionId is required")
    .isString()
    .withMessage("sessionId must be a string")
    .custom(async (id) => {
      const session = await Sessions.findById(id);
      if (!session) return Promise.reject(new Error("Session does not exist"));
    }),
];

const updateSession = [
  body("day")
    .optional()
    .notEmpty()
    .withMessage("day is required")
    .isInt({ min: 0, max: 6 })
    .withMessage("day must be between 0 and 6"),
  body("hour")
    .optional()
    .notEmpty()
    .withMessage("hour is required")
    .isInt({ min: 1, max: 12 })
    .withMessage("hour must be between 0 and 23"),
  body("min")
    .optional()
    .notEmpty()
    .withMessage("min is required")
    .isInt({ min: 0, max: 59 })
    .withMessage("min must be between 0 and 59"),
  body("AmPm")
    .optional()
    .notEmpty()
    .withMessage("AmPm is required")
    .isIn(["AM", "PM"])
    .withMessage("AmPm must be AM or PM"),
  body("grade")
    .optional()
    .notEmpty()
    .withMessage("Grade is required")
    .isString()
    .withMessage("Grade must be a string")
    .isMongoId()
    .withMessage("Grade must be a valid Mongo ID")
    .custom(async (value) => {
      const grade = await Grades.findById(value);
      if (!grade) return Promise.reject(new Error("Grade does not exist"));
      else return;
    }),
];

const activeSession = [
  body("sessionId")
    .notEmpty()
    .withMessage("Session ID is required")
    .isMongoId()
    .withMessage("Session ID must be a valid Mongo ID")
    .custom(async (value) => {
      const session = await Sessions.findById(value);
      if (!session) return Promise.reject(new Error("Session does not exist"));
      else return;
    }),
];

const addStudent = [
  body("studentId")
    .notEmpty()
    .withMessage("Student ID is required")
    .isMongoId()
    .withMessage("Student ID must be a valid Mongo ID")
    .custom(async (value) => {
      const student = await Students.findById(value);
      if (!student) return Promise.reject(new Error("Student does not exist"));
      else return;
    })
    .custom(async (studentId, { req }) => {
      const session = await Sessions.findById(req.body.sessionId);
      const sessionStudents =
        session.history[session.history.length - 1].students;
      const check = sessionStudents.find(
        (studentData) => studentId === studentData.studentId
      );
      if (check)
        return Promise.reject(
          new Error("Student already exists to this session")
        );
    }),
  body("sessionId")
    .notEmpty()
    .withMessage("Session ID is required")
    .isMongoId()
    .withMessage("Session ID must be a valid Mongo ID")
    .custom(async (value) => {
      const session = await Sessions.findById(value);
      if (!session) return Promise.reject(new Error("Session does not exist"));
      else return;
    })
    .custom(async (value) => {
      const session = await Sessions.findById(value);
      if (!session.active)
        return Promise.reject(new Error("Session does not activated"));
      else return;
    })
    .custom(async (sessionId, { req }) => {
      const session = await Sessions.findById(sessionId);
      const student = await Students.findById(req.body.studentId);
      if (session.grade.toString() != student.grade.toString())
        return Promise.reject(
          new Error(
            `this student can not join this session as he is in nother grade`
          )
        );
      else return;
    }),
  body("homeWork")
    .notEmpty()
    .withMessage("Home work is required")
    .isBoolean()
    .withMessage("Home work must be a boolean"),
  body("quiz")
    .notEmpty()
    .withMessage("Quiz is required")
    .isObject()
    .withMessage("Quiz must be an object"),
  body("quiz.maxGrade")
    .notEmpty()
    .withMessage("Max grade is required")
    .isNumeric()
    .withMessage("Max grade must be a number"),
  body("quiz.studentGrade")
    .notEmpty()
    .withMessage("Student grade is required")
    .isNumeric()
    .withMessage("Student grade must be a number"),
];
export default {
  addSession,
  getSession,
  deleteSession,
  updateSession,
  activeSession,
  addStudent,
};
