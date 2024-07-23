import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const studentsSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: "Grades",
      required: [true, "Grade is required"],
    },
    school: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    GuardianPhone: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    sessions: [
      {
        sessionId: { type: Schema.Types.ObjectId, ref: "Sessions" },
        assistantId: { type: Schema.Types.ObjectId, ref: "Accounts" },
        Date: String,
        time: String,
        homeWork: Boolean,
        quiz: {
          maxGrade: String,
          studentGrade: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Students = model("Students", studentsSchema);

export default Students;
