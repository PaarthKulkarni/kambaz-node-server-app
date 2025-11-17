const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: 1,
  name: "NodeJS Module",
  description: "Create a NodeJS server with ExpressJS",
  course: "Batman",
};

export default function WorkingWithObjects(app) {
  
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  app.get("/lab5/assignment", getAssignment);

  const getModule = (req, res) => {
    res.json(module);
  };
  app.get("/lab5/module", getModule);

  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  app.get("/lab5/assignment/title", getAssignmentTitle);

  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  app.get("/lab5/module/name", getModuleName);

  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);

  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = newScore;
    res.json(assignment);
  };
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);

  const setAssignmentCompletion = (req, res) => {
    const { newCompletion } = req.params;
    assignment.completed = newCompletion;
    res.json(assignment);
  };
  app.get("/lab5/assignment/completed/:newCompletion", setAssignmentCompletion);
}