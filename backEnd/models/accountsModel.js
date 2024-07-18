import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const accountsSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      unique: [true, "this email is in use"],
      required: [true, "full name is required"],
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Accounts = model("Accounts", accountsSchema);

export default Accounts;
