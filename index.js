import express from 'express';
import mongoose from 'mongoose';
import Hello from "./Hello.js";
import cors from "cors";
import Lab5 from "./Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from './Kambaz/Modules/route.js';
import "dotenv/config";
import session from "express-session";
import AssignmentsRoutes from './Kambaz/Assignments/route.js';
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';
import CourseModel from './Kambaz/Courses/model.js';
import UserModel from './Kambaz/Users/model.js';
import EnrollmentModel from './Kambaz/Enrollments/model.js';

const app = express();
const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
const seedDatabase = async () => {
  try {
    await CourseModel.deleteMany({});
    const coursesWithModules = db.courses.map(course => {
      const courseModules = db.modules
        .filter(module => module.course === course._id)
        .map(module => ({
          _id: module._id,
          name: module.name,
          description: module.description,
          lessons: module.lessons || []
        }));
      
      return {
        ...course,
        modules: courseModules
      };
    });
    
    await CourseModel.insertMany(coursesWithModules);
    console.log("Database seeded with courses and embedded modules");
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      await UserModel.insertMany(db.users);
      console.log("Database seeded with initial users");
    }
    await EnrollmentModel.deleteMany({});
    await EnrollmentModel.insertMany(db.enrollments);
    console.log("Database seeded with enrollments");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();

app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.CLIENT_URL || "http://localhost:3000",

  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

app.use((req, res, next) => {
    console.log("--------------------------------");
    console.log("Request URL:", req.url);
    console.log("Session ID:", req.sessionID);
    console.log("Session User:", req.session.currentUser ? req.session.currentUser.username : "Guest (No User)");
    console.log("Cookies:", req.headers.cookie);
    console.log("--------------------------------");
    next();
});

UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
