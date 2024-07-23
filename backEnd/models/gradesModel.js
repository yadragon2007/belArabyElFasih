import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const gradesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sort: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Grades = model("Grades", gradesSchema);

export default Grades;
