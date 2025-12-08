import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    marks: Number,
    availDate: String,
    availTime: String,
    dueDate: String,
    dueTime: String,
    desc: String,
    display: String,
    submission: String,
    assign: String,
    group: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;