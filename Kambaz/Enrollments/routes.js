import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = async (req, res) => {
    const { userId } = req.params;
    const { courseId } = req.body;
    const newEnrollment = await dao.enrollUserInCourse(userId, courseId);
    res.send(newEnrollment);
  };

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const unenrollUserFromCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    const status = await dao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  };

  app.get("/api/users/current/enrollments", (req, res) => {
    if (!req.session.currentUser) {
      return res.sendStatus(401);
    }
    req.params.userId = req.session.currentUser._id;
    findEnrollmentsForUser(req, res);
  });

  app.post("/api/users/current/enrollments", (req, res) => {
    if (!req.session.currentUser) {
      return res.sendStatus(401);
    }
    req.params.userId = req.session.currentUser._id;
    enrollUserInCourse(req, res);
  });

  app.delete("/api/users/current/enrollments/:courseId", (req, res) => {
    if (!req.session.currentUser) {
      return res.sendStatus(401);
    }
    req.params.userId = req.session.currentUser._id;
    unenrollUserFromCourse(req, res);
  });

  app.delete("/api/courses/:courseId/enrollments/:userId", unenrollUserFromCourse);
}