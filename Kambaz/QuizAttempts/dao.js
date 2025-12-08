import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizAttemptsDao() {
  // Create a new quiz attempt when student starts the quiz
  function createAttempt(quiz, student, course) {
    const newAttempt = {
      _id: uuidv4(),
      quiz,
      student,
      course,
      attemptNumber: 1,
      answers: [],
      status: "IN_PROGRESS",
    };
    return model.create(newAttempt);
  }

  // Get all attempts for a specific student and quiz
  function getAttemptsByStudentAndQuiz(quizId, studentId) {
    return model
      .find({ quiz: quizId, student: studentId })
      .sort({ attemptNumber: -1 });
  }

  // Get a specific attempt
  function getAttemptById(attemptId) {
    return model.findOne({ _id: attemptId });
  }

  // Get the most recent attempt for a student in a quiz
  function getLastAttemptByStudentAndQuiz(quizId, studentId) {
    return model
      .findOne({ quiz: quizId, student: studentId })
      .sort({ attemptNumber: -1 });
  }

  // Update attempt with answers
  function updateAttemptAnswers(attemptId, answers) {
    return model.updateOne({ _id: attemptId }, { $set: { answers } });
  }

  // Submit the quiz attempt and calculate score
  function submitAttempt(attemptId, answers, score, totalPoints) {
    const submittedTime = new Date();
    const percentage = (score / totalPoints) * 100;

    return model.updateOne(
      { _id: attemptId },
      {
        $set: {
          answers,
          score,
          totalPoints,
          percentage,
          submittedTime,
          status: "SUBMITTED",
        },
      }
    );
  }

  // Get all attempts for a quiz (for instructors)
  function getAttemptsForQuiz(quizId) {
    return model.find({ quiz: quizId }).sort({ student: 1, attemptNumber: -1 });
  }

  // Check if student can take another attempt
  async function canStudentAttempt(quizId, studentId, maxAttempts) {
    const attempts = await model.find({ quiz: quizId, student: studentId });
    return attempts.length < maxAttempts;
  }

  // Get next attempt number
  async function getNextAttemptNumber(quizId, studentId) {
    const lastAttempt = await model
      .findOne({ quiz: quizId, student: studentId })
      .sort({ attemptNumber: -1 });
    return lastAttempt ? lastAttempt.attemptNumber + 1 : 1;
  }

  return {
    createAttempt,
    getAttemptsByStudentAndQuiz,
    getAttemptById,
    getLastAttemptByStudentAndQuiz,
    updateAttemptAnswers,
    submitAttempt,
    getAttemptsForQuiz,
    canStudentAttempt,
    getNextAttemptNumber,
  };
}
