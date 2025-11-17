import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // POST /api/users/:userId/enrollments -> Enroll a user in a course
  const enrollUserInCourse = (req, res) => {
    const { userId } = req.params;
    const { courseId } = req.body;
    const enrollment = { user: userId, course: courseId };
    const newEnrollment = dao.createEnrollment(enrollment);
    res.send(newEnrollment);
  };

  // GET /api/users/:userId/enrollments -> Find all enrollments for a user
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  // DELETE /api/users/:userId/enrollments/:courseId -> Unenroll a user from a course
  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.deleteEnrollment(userId, courseId);
    res.send(status);
  };

  // Routes using 'current' user for authenticated endpoints
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
}