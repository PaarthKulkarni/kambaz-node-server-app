import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function createEnrollment(enrollment) {
    const { enrollments } = db;
    const existing = enrollments.find(
      (e) => e.user === enrollment.user && e.course === enrollment.course
    );
    if (existing) {
      return existing;
    }

    const newEnrollment = {
      ...enrollment,
      _id: uuidv4(),
    };
    db.enrollments = [...enrollments, newEnrollment];
    return newEnrollment;
  }
  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((e) => e.user === userId);
  }

  function deleteEnrollment(userId, courseId) {
    const { enrollments } = db;
    const initialLength = enrollments.length;
    db.enrollments = enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return initialLength !== db.enrollments.length;
  }

  return {
    createEnrollment,
    findEnrollmentsForUser,
    deleteEnrollment,
    enrollUserInCourse,
  };
}
