import UsersDao from "./dao.js";
export default function UserRoutes(app, db) {
 const dao = UsersDao(db);
  const createUser = (req, res) => {
    const newUser = dao.createUser(req.body);
    res.json(newUser);
  };
  const deleteUser = (req, res) => {
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.sendStatus(200);
  };
  const findAllUsers = (req, res) => {
    const users = dao.findAllUsers();
    res.json(users);
  };
  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);

    const currentSessionUser = req.session["currentUser"];
    if (currentSessionUser && currentSessionUser._id === userId) {
      req.session["currentUser"] = currentUser;
    }

    req.session.save((err) => {
      if (err) {
        res.status(500).json({ message: "Session save failed" });
      } else {
        res.json(currentUser);
      }
    });
  };
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);

    req.session.save((err) => {
      if (err) {
        res.status(500).json({ message: "Session save failed" });
      } else {
        res.json(currentUser);
      }
    });
   };
  const signin = (req, res) => { 
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      req.session.save((err) => {
        if (err) {
          res.status(500).json({ message: "Unable to login. Try again later." });
        } else {
          res.json(currentUser);
        }
      });
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
    const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const findUsersByCourse = (req, res) => {
    const { courseId } = req.params;
    const users = dao.findUsersByCourse(courseId);
    res.json(users);
  };

  app.get("/api/courses/:courseId/users", findUsersByCourse);  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
