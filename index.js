import express from 'express'
import Hello from "./Hello.js"
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
const app = express();
app.use(cors({
   credentials: true,
   origin: process.env.CLIENT_URL || "http://localhost:3000",
 }));
 const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: "lax",
  }
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
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