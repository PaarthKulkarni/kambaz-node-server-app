import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const createQuizForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = await dao.createQuiz(quiz);
    res.send(newQuiz);
  };

  const deleteQuizById = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.send(status);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  };

  const getQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  };

  const getAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuizzes();
    res.json(quizzes);
  };

  app.get("/api/quizzes", getAllQuizzes);
  app.get("/api/quizzes/:quizId", getQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuizById);
  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
}
