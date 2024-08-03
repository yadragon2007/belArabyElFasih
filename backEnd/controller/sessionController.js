import Accounts from "../models/accountsModel.js";
import Sessions from "../models/sessionsModel.js";
import Students from "../models/studentsModel.js";
import time from "../utils/time.js";

// @route   POST api/sessions/
// @desc    add session
// @access  Public

const addClass_post = async (req, res) => {
  let data = req.body;
  delete req.body.userId;
  try {
    const newSession = new Sessions(data);
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// @route   GET api/sessions/
// @desc    get all sessions
// @access  Public

const getAllClasses_get = async (req, res) => {
  try {
    const filter = req.query;
    const sessions = await Sessions.find(filter)
      .populate("grade")
      .populate({
        path: "history.students.studentId",
        model: "Students",
      })
      .populate({
        path: "history.students.assistantId",
        model: "Accounts",
      })
      .exec();

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAnClass_get = async (req, res) => {
  try {
    const session = await Sessions.findById(req.params.sessionId)
      .populate("grade")
      .populate({
        path: "history.students.studentId",
        model: "Students",
      })
      .populate({
        path: "history.students.assistantId",
        model: "Accounts",
      });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// @route   DELETE api/sessions/
// @desc    delete session
// @access  Public

const deleteClass_delete = async (req, res) => {
  let { sessionId } = req.params;
  try {
    await Sessions.findByIdAndDelete(sessionId);
    res.status(200).json({ msg: "class deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// @route   PUT api/sessions/
// @desc    update session data
// @access  Public

const updateClass_put = async (req, res) => {
  let { sessionId } = req.body;
  let data = req.body;
  delete data.sessionId;
  delete data.userId;
  try {
    await Sessions.findByIdAndUpdate(sessionId, data);
    const session = await Sessions.findById(sessionId);
    res.status(200).json({ msg: "class updated successfully", session });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
// @route   PATCH api/sessions/active
// @desc    active session
// @access  Public

const activeSession_patch = async (req, res) => {
  const { sessionId, examGrade } = req.body;
  try {
    const session = await Sessions.findById(sessionId);
    if (!session.active) {
      let newHistroy = session.history;
      newHistroy.push({
        Date: time.getCurrentDateInTimeZone("Egypt"),
        from: time.getCurrentTimeInTimeZone("Egypt"),
        examGrade,
      });
      console.log(newHistroy);
      await Sessions.findByIdAndUpdate(sessionId, {
        active: true,
        history: newHistroy,
      });
      res.status(200).json({ msg: "session activated successfully" });
    } else {
      let newHistroy = session.history;
      newHistroy[session.history.length - 1].to =
        time.getCurrentTimeInTimeZone("Egypt");

      await Sessions.findByIdAndUpdate(sessionId, {
        active: false,
        history: newHistroy,
      });
      await Sessions.findByIdAndUpdate(sessionId, { active: false });
      res.status(200).json({ msg: "session un activated successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// @route   POST api/sessions/add/sutdent
// @desc    add student to a session
// @access  Public

const addStudentToSession_post = async (req, res) => {
  const { sessionId, studentId, homeWork, studentExamGrade, userId } = req.body;
  try {
    const session = await Sessions.findById(sessionId);
    const student = await Students.findById(studentId);
    const assistant = await Accounts.findById(userId);
    // student data
    const studentSessionData = {
      sessionId,
      assistantId: userId,
      Date: time.getCurrentDateInTimeZone("Egypt"),
      time: time.getCurrentTimeInTimeZone("Egypt"),
      homeWork,
      quiz: {
        maxGrade: session.history[session.history.length - 1].examGrade,
        studentGrade: studentExamGrade,
      },
    };
    student.sessions.push(studentSessionData);
    await student.save();
    // session data
    const SessionData = {
      studentId,
      assistantId: userId,
      time: time.getCurrentTimeInTimeZone("Egypt"),
      homeWork,
      studentExamGrade,
    };
    session.history[session.history.length - 1].students.push(SessionData);
    await session.save();

    // return
    return res.status(200).json({ msg: "student added successfully" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export default {
  addClass_post,
  getAllClasses_get,
  getAnClass_get,
  deleteClass_delete,
  updateClass_put,
  activeSession_patch,
  addStudentToSession_post,
};
