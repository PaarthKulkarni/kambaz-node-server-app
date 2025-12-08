import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao() {
  function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }

  function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }

  function createQuiz(quiz) {
    const newQuiz = { ...quiz, _id: uuidv4(), questions: quiz.questions || [] };
    return model.create(newQuiz);
  }

  function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, { $set: quizUpdates });
  }

  function findQuizById(quizId) {
    return model.findOne({ _id: quizId });
  }

  function findAllQuizzes() {
    return model.find({});
  }

  return {
    findQuizzesForCourse,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    findQuizById,
    findAllQuizzes,
  };
}
