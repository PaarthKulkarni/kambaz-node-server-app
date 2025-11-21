import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = (req, res) => {
    const { userId } = req.params;
    const { courseId } = req.body;
    const enrollment = { user: userId, course: courseId };
    const newEnrollment = dao.createEnrollment(enrollment);
    res.send(newEnrollment);
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.deleteEnrollment(userId, courseId);
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