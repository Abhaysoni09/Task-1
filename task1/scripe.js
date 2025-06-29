const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Who is the founder of Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
    answer: "Bill Gates"
  },
  {
    question: "Which HTML tag is used to insert an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: "<img>"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  clearOptions();
  const current = questions[currentQuestion];
  questionEl.textContent = current.question;
  progressEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  current.options.forEach((optionText) => {
    const button = document.createElement("button");
    button.textContent = optionText;
    button.addEventListener("click", () => selectOption(button, current.answer));
    optionsEl.appendChild(button);
  });
}

function clearOptions() {
  optionsEl.innerHTML = "";
}

function selectOption(selectedButton, correctAnswer) {
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (selectedButton.textContent === correctAnswer) {
    selectedButton.style.backgroundColor = "#90ee90"; // green
    score++;
  } else {
    selectedButton.style.backgroundColor = "#ff7f7f"; // red
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.style.backgroundColor = "#90ee90";
      }
    });
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.disabled = true;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  progressEl.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.classList.remove("hide");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

loadQuestion();
nextBtn.disabled = true;
