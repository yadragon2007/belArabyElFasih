import Students from "../models/studentsModel.js";

const addStudent_post = async (req, res) => {
  const data = req.body;
  delete data.userId;
  try {
    const newStudnet = new Students(data);
    await newStudnet.save();
    return res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getAllStudents_get = async (req, res) => {
  try {
    const filter = req.query;
    const student = await Students.find(filter).populate("grade").exec();
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const studentCode_get = async (req, res) => {
  try {
    const { code } = req.params;
    const student = await Students.findOne({ code: code })
      .populate("grade")
      .populate({
        path: "sessions.sessionId",
        model: "Sessions",
      })
      .populate({
        path: "sessions.assistantId",
        model: "Accounts",
      })
      .exec();
    if (!student) return res.status(404).send({ message: "Student not found" });
    else return res.status(200).json(student);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const updateStudent_put = async (req, res) => {
  try {
    const { code } = req.body;
    await Students.findOneAndUpdate({ code: code }, req.body);
    return res.status(200).json({
      message: "Student updated successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};
const deleteStudent_delete = async (req, res) => {
  try {
    const { code } = req.params;
    await Students.findOneAndDelete({ code: code });
    return res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export default {
  addStudent_post,
  studentCode_get,
  getAllStudents_get,
  updateStudent_put,
  deleteStudent_delete,
};
