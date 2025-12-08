import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  type: {
    type: String,
    enum: ["SINGLE_CHOICE","MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
    default: "SINGLE_CHOICE"
  },
  title: String,
  points: { type: Number, default: 10 },
  question: String,
  choices: [{ //MCQ
    text: String,
    isCorrect: Boolean
  }],
  correctAnswer: Boolean,//T&F
  possibleAnswers: [String],//FIB
    blanks: [{  // ADD THIS - FIB new format for multiple blanks
        id: String,
        possibleAnswers: [String]
    }]
});

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    quizType: {
      type: String,
      enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED_QUIZ"
    },
    points: { type: Number, default: 0 },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES"
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "IMMEDIATELY" },
    accessCode: { type: String, default: "" },
    oneQuestionAtTime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    dueTime: String,
    availDate: String,
    availTime: String,
    published: { type: Boolean, default: false },
    questions: [questionSchema]
  },
  { collection: "quizzes" }
);

export default quizSchema;