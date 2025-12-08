import QuizAttemptsDao from "./dao.js";
import QuizzesDao from "../Quizzes/dao.js";

export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();
  const quizzesDao = QuizzesDao();

  // Start a new quiz attempt
  const startQuizAttempt = async (req, res) => {
    try {
      const { quizId, courseId } = req.params;
      const studentId = req.session.currentUser._id;

      const quiz = await quizzesDao.findQuizById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      // Check if student can attempt
      if (quiz.multipleAttempts === false) {
        // Only one attempt allowed
        const existingAttempt = await dao.getLastAttemptByStudentAndQuiz(
          quizId,
          studentId
        );
        if (existingAttempt && existingAttempt.status === "SUBMITTED") {
          return res
            .status(403)
            .json({
              message: "Quiz already submitted. No more attempts allowed.",
            });
        }
      } else {
        // Multiple attempts allowed
        const canAttempt = await dao.canStudentAttempt(
          quizId,
          studentId,
          quiz.howManyAttempts
        );
        if (!canAttempt) {
          return res
            .status(403)
            .json({
              message: `Maximum attempts (${quiz.howManyAttempts}) reached.`,
            });
        }
      }

      const attemptNumber = await dao.getNextAttemptNumber(quizId, studentId);
      const newAttempt = await dao.createAttempt(quizId, studentId, courseId);

      // Update attempt number
      await dao.updateAttemptAnswers(newAttempt._id, []);

      res.json(newAttempt);
    } catch (error) {
      res.status(500).json({ message: "Error starting quiz attempt", error });
    }
  };

  // Get quiz attempt details
  const getAttempt = async (req, res) => {
    try {
      const { attemptId } = req.params;
      const attempt = await dao.getAttemptById(attemptId);

      if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      res.json(attempt);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving attempt", error });
    }
  };

  // Update attempt answers (auto-save)
  const updateAttemptAnswers = async (req, res) => {
    try {
      const { attemptId } = req.params;
      const { answers } = req.body;

      await dao.updateAttemptAnswers(attemptId, answers);
      res.json({ message: "Answers saved" });
    } catch (error) {
      res.status(500).json({ message: "Error saving answers", error });
    }
  };

  // Submit quiz attempt
  const submitQuizAttempt = async (req, res) => {
    try {
      const { attemptId } = req.params;
      const { answers } = req.body;

      const attempt = await dao.getAttemptById(attemptId);
      if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      // Get the quiz to validate answers
      const quiz = await quizzesDao.findQuizById(attempt.quiz);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      // Calculate score
      let score = 0;
      let totalPoints = 0;

      const answersWithCorrectness = answers.map((answer) => {
        const question = quiz.questions.find(
          (q) => q._id === answer.questionId
        );
        if (!question) return answer;

        totalPoints += question.points || 0;
        let isCorrect = false;

        if (question.type === "MULTIPLE_CHOICE") {
          const correctChoice = question.choices.find((c) => c.isCorrect);
          isCorrect = answer.selectedAnswer === correctChoice.text;
        } else if (question.type === "TRUE_FALSE") {
          isCorrect = answer.selectedAnswer === question.correctAnswer;
        } else if (question.type === "FILL_IN_BLANK") {
          isCorrect = question.possibleAnswers.some(
            (possibleAnswer) =>
              possibleAnswer.toLowerCase() ===
              answer.selectedAnswer.toLowerCase()
          );
        }

        if (isCorrect) {
          score += question.points || 0;
        }

        return { ...answer, isCorrect };
      });

      await dao.submitAttempt(
        attemptId,
        answersWithCorrectness,
        score,
        totalPoints
      );

      res.json({
        score,
        totalPoints,
        percentage: (score / totalPoints) * 100,
        answers: answersWithCorrectness,
      });
    } catch (error) {
      res.status(500).json({ message: "Error submitting quiz", error });
    }
  };

  // Get all attempts by a student for a quiz
  const getStudentAttempts = async (req, res) => {
    try {
      const { quizId } = req.params;
      const studentId = req.session.currentUser._id;

      const attempts = await dao.getAttemptsByStudentAndQuiz(quizId, studentId);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving attempts", error });
    }
  };

  // Get all attempts for a quiz (instructor only)
  const getAllAttemptsForQuiz = async (req, res) => {
    try {
      const { quizId } = req.params;
      const attempts = await dao.getAttemptsForQuiz(quizId);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving attempts", error });
    }
  };

  // Routes
  app.post("/api/quizzes/:quizId/courses/:courseId/attempts", startQuizAttempt);
  app.get("/api/attempts/:attemptId", getAttempt);
  app.put("/api/attempts/:attemptId/answers", updateAttemptAnswers);
  app.post("/api/attempts/:attemptId/submit", submitQuizAttempt);
  app.get("/api/quizzes/:quizId/attempts", getStudentAttempts);
  app.get("/api/quizzes/:quizId/attempts/all", getAllAttemptsForQuiz);
}
