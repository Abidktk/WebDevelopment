const Questions = [
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["let", "loop", "define", "int"],
    answer: 0,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: 2,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "##", "**"],
    answer: 0,
  },
  {
    question: "Which method selects an element by ID?",
    options: [
      "querySelector()",
      "getElementById()",
      "getElementsByClassName()",
      "selectElement()",
    ],
    answer: 1,
  },
  {
    question: "Which operator checks value and datatype?",
    options: ["==", "=", "===", "!="],
    answer: 2,
  },
  {
    question: "Which method prints output in the browser console?",
    options: [
      "console.log()",
      "print()",
      "document.write()",
      "alert()",
    ],
    answer: 0,
  },
  {
    question: "Which loop executes at least one time?",
    options: ["for", "while", "do...while", "foreach"],
    answer: 2,
  },
  {
    question: "JavaScript is a ______ language.",
    options: [
      "Programming",
      "Database",
      "Operating System",
      "Browser",
    ],
    answer: 0,
  },
  {
    question: "Which event occurs when a button is clicked?",
    options: ["mouseover", "click", "change", "submit"],
    answer: 1,
  },
  {
    question: "Which method converts JSON into an object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: 1,
  },
];
const startScreen = document.getElementById("startScreen");
const quizscreen = document.getElementById("quizScreen");
const resultscreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const restartBtn = document.getElementById("restartBtn");

const question = document.getElementById("question");
const options = document.getElementById("options");
const questionNumber = document.getElementById("questionNumber");
const timer = document.getElementById("timer");

const score = document.getElementById("score");
const correct = document.getElementById("correct");
const wrong = document.getElementById("wrong");
const percentage = document.getElementById("percentage");
const review = document.getElementById("review");

let currentquestion = 0;
let useranswer = [];
let timeLeft = 60;
let interval;

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden")
  quizscreen.classList.remove("hidden")

  showQuestion()
})
const showQuestion = () => {
  clearInterval(interval);
  timeLeft = 60;

  startTimer();

  const q = Questions[currentquestion];


  questionNumber.innerText = `Question ${currentquestion + 1}`
  question.innerText = q.question

  options.innerHTML = ""
  q.options.map((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option")

    if (useranswer[currentquestion] === index) {
      btn.classList.add("selected")
    }

    btn.onclick = () => selectAnswer(index)
    options.appendChild(btn)
  })
}

const startTimer = () => {
  timer.innerText = timeLeft;

  interval = setInterval(() => {
    timeLeft--;
    timer.innerText = timeLeft

    if (timeLeft === 0) {
      clearInterval(interval)
      nextQuestion()
    }
  }, 1000)
}

const nextQuestion = () => {
  if (currentquestion < Questions.length - 1) {
    currentquestion++
    showQuestion()
  } else {
    showResult()
  }
}
nextBtn.addEventListener("click", nextQuestion)

prevBtn.addEventListener("click", () => {
  if (currentquestion > 0) {
    currentquestion--;
    showQuestion()
  }
})

const selectAnswer = (index) => {
  useranswer[currentquestion] = index
  showQuestion()
}

const showResult = () => {
  clearInterval(interval);
  quizscreen.classList.add("hidden");
  resultscreen.classList.remove("hidden");

  let correctCount = 0;
  let wrongCount = 0;
  let unanswerCount = 0


  review.innerHTML = "";
  Questions.map((question, index) => {
    if (useranswer[index] === undefined) {
      unanswerCount++
    } else if (useranswer[index] === question.answer) {
      correctCount++
    } else {
      wrongCount++
    }


    review.innerHTML += `
      <div class = "reviewItem">
        <h3>Question ${index + 1}</h3>
        <p>${question.question}</p>


        <p>Your Answes :
          <span class = "${useranswer[index] === question.answer ? "correctAnswer" : "wrongAnswer"}">${useranswer[index] === undefined ? "Not Answered" : question.options[useranswer[index]]}</span>
        </p>
        <p>Correct Options:
        ${question.options[question.answer]}
        </p>
      </div>
    `
  })

  score.innerText = `Score : ${correctCount} / ${Questions.length}`
  correct.innerText = `Correct : ${correctCount}`;
  wrong.innerText = `Wrong : ${wrongCount}`;
  unanswered.innerText = `Unanswered : ${unansweredCount}`;
  percentage.innerText = `Percentage : ${correctCount / Questions.length * 100}%`
}

restartBtn.addEventListener("click", () => {
  currentquestion = 0;
  useranswer = [];

  resultscreen.classList.add("hidden")
  startScreen.classList.remove("hidden")
})



// useranswer[0] = 2 
