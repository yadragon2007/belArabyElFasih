import Grads from "../models/gradesModel.js";

const addGrade_post = async (req, res) => {
  const { name, sort } = req.body;
  try {
    const newGrade = new Grads({ name, sort });
    await newGrade.save();
    res.status(201).json({ msg: "Grad add successfully", grade: newGrade });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
const getAllGrade_get = async (req, res) => {
  try {
    const fillter = req.params;
    let grades = await Grads.find(fillter);

    grades.sort((a, b) => {
      if (a.sort < b.sort) return -1;
      if (a.sort > b.sort) return 1;
      return 0;
    });
    res.status(200).json({ grades });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
const removeGrade_delete = async (req, res) => {
  try {
    const { gradeId } = req.body;
    await Grads.findByIdAndDelete(gradeId);
    res.status(200).json({ msg: "grade deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export default {
  addGrade_post,
  getAllGrade_get,
  removeGrade_delete,
};
