import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const sessionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    grade: {
      type: Schema.Types.ObjectId,
      ref: "Grade",
      required: [true, "Grade is required"],
    },
    history: {
      Date: Date,
      students: [
        {
          id: { type: Schema.Types.ObjectId, ref: "Students" },
          time: Date,
          homeWork: Boolean,
          quiz: {
            quizGrade: String,
            studentGrade: String,
          },
        },
      ],
    },
    active: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Sessions = model("Sessions", sessionsSchema);

export default Sessions;
