import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: String,
  questionType: String,
  selectedAnswer: mongoose.Schema.Types.Mixed, // Can be string for MCQ, boolean for T/F, or string for FIB
  isCorrect: Boolean,
});

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: String,
    student: String,
    course: String,
    attemptNumber: { type: Number, default: 1 },
    answers: [answerSchema],
    score: Number,
    totalPoints: Number,
    percentage: Number,
    startTime: { type: Date, default: Date.now },
    submittedTime: Date,
    timeTaken: Number, // in seconds
    status: {
      type: String,
      enum: ["IN_PROGRESS", "SUBMITTED"],
      default: "IN_PROGRESS",
    },
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;
