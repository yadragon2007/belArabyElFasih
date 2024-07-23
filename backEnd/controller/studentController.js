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

const studentCode_get = async (req, res) => {
  try {
    const { code } = req.params;
    const student = await Students.findOne({ code: code })
      .populate("grade")
      .exec();
    if (!student) return res.status(404).send({ message: "Student not found" });
    else return res.status(200).json(student);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export default {
  addStudent_post,
  studentCode_get,
};
