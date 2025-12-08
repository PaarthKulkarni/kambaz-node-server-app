export default [
  {
    _id: "651a2b3c4d5e6f7a8b9c0d1e",
    title: "Midterm: Propulsion Fundamentals",
    course: "RS101",
    description:
      "This quiz covers the basics of rocket propulsion, including Newton's laws and standard fuel types.",
    quizType: "GRADED_QUIZ",
    points: 30,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "IMMEDIATELY",
    accessCode: "",
    oneQuestionAtTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-15",
    dueTime: "23:59",
    availDate: "2024-12-01",
    availTime: "09:00",
    published: true,
    questions: [
      {
        _id: "651a2b3c4d5e6f7a8b9c0d1f",
        type: "MULTIPLE_CHOICE",
        title: "Oxidizers",
        points: 10,
        question:
          "Which of the following is commonly used as an oxidizer in liquid rocket engines?",
        choices: [
          {
            text: "Liquid Oxygen",
            isCorrect: true,
          },
          {
            text: "Kerosene",
            isCorrect: false,
          },
          {
            text: "Liquid Hydrogen",
            isCorrect: false,
          },
          {
            text: "Nitrogen",
            isCorrect: false,
          },
        ],
      },
      {
        _id: "651a2b3c4d5e6f7a8b9c0d20",
        type: "TRUE_FALSE",
        title: "Newton's Third Law",
        points: 10,
        question:
          "Newton's Third Law states that for every action, there is an equal and opposite reaction.",
        correctAnswer: true,
      },
      {
        _id: "651a2b3c4d5e6f7a8b9c0d21",
        type: "FILL_IN_BLANK",
        title: "Thrust Definition",
        points: 10,
        question: "The force that propels a rocket upward is called _____.",
        possibleAnswers: ["Thrust", "thrust", "THRUST"],
      },
    ],
  },
  {
    _id: "651a2b3c4d5e6f7a8b9c0d2e",
    title: "Quiz 1: HTML Basics",
    course: "CS5610",
    description:
      "Test your knowledge of HTML fundamentals including tags, attributes, and semantic HTML.",
    quizType: "GRADED_QUIZ",
    points: 20,
    assignmentGroup: "QUIZZES",
    shuffleAnswers: true,
    timeLimit: 15,
    multipleAttempts: true,
    howManyAttempts: 3,
    showCorrectAnswers: "AFTER_SUBMISSION",
    accessCode: "",
    oneQuestionAtTime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2024-12-20",
    dueTime: "23:59",
    availDate: "2024-12-05",
    availTime: "08:00",
    published: true,
    questions: [
      {
        _id: "651a2b3c4d5e6f7a8b9c0d2f",
        type: "MULTIPLE_CHOICE",
        title: "HTML Document Structure",
        points: 10,
        question: "What is the correct order of HTML document structure?",
        choices: [
          {
            text: "&lt;html&gt;, &lt;head&gt;, &lt;body&gt;",
            isCorrect: true,
          },
          {
            text: "&lt;head&gt;, &lt;body&gt;, &lt;html&gt;",
            isCorrect: false,
          },
          {
            text: "&lt;body&gt;, &lt;head&gt;, &lt;html&gt;",
            isCorrect: false,
          },
          {
            text: "&lt;html&gt;, &lt;body&gt;, &lt;head&gt;",
            isCorrect: false,
          },
        ],
      },
      {
        _id: "651a2b3c4d5e6f7a8b9c0d30",
        type: "TRUE_FALSE",
        title: "Meta Tags",
        points: 10,
        question:
          "Meta tags are placed in the body section of an HTML document.",
        correctAnswer: false,
      },
    ],
  },
];
