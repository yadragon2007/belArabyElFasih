import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const sessionsSchema = new Schema(
  {
    day: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    min: {
      type: String,
      required: true,
    },
    AmPm: {
      type: String,
      required: true,
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: "Grades",
      required: [true, "Grade is required"],
    },
    history: [
      {
        Date: String,
        from: String,
        to: String,
        examGrade: { type: String, default: "noExam" },
        students: [
          {
            studentId: { type: Schema.Types.ObjectId, ref: "Students" },
            assistantId: { type: Schema.Types.ObjectId, ref: "Accounts" },
            time: String,
            homeWork: Boolean,
            studentExamGrade: { type: String, default: "noExam" },
          },
        ],
      },
    ],
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Sessions = model("Sessions", sessionsSchema);

export default Sessions;
