console.log("script.js loaded");

let questions = [], current = 0, right = 0, wrong = 0, start;

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl  = document.getElementById("options");
const quizEl     = document.getElementById("quiz");
const resultEl   = document.getElementById("result");

const category = new URLSearchParams(location.search).get("category");

fetch("question.json")
  .then(res => {
    if (!res.ok) throw new Error("Cannot find question.json (check the path)");
    return res.json();
  })
  .then(data => {
    const clean = s => String(s).toLowerCase().replace(/[^a-z]/g, "");

const list = category
  ? data.filter(q => clean(q.category) === clean(category))
  : data;
    questions = list.slice(0, 10);

    if (questions.length === 0) {
      questionEl.textContent = "No questions found for category: " + category;
      return;
    }
    start = Date.now();
    show();
  })
  .catch(err => {
    questionEl.textContent = "Error: " + err.message;
    console.log(err);
  });

function show() {
  const q = questions[current];
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  questionEl.textContent = q.question || q.text || q.title || q.q;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => check(i, btn);
    optionsEl.appendChild(btn);
  });
}

function check(i, btn) {
  const q = questions[current];
  [...optionsEl.children].forEach(b => b.disabled = true);

  const key = q.answer ?? q.correct ?? q.correctAnswer ?? q.correct_answer;
  let correctIndex = q.options.indexOf(key);
  if (correctIndex === -1) correctIndex = Number(key);

  if (i === correctIndex) {
    right++;
    btn.classList.add("right");
  } else {
    wrong++;
    btn.classList.add("wrong");
    optionsEl.children[correctIndex]?.classList.add("right");
  }

  setTimeout(() => {
    current++;
    current < questions.length ? show() : finish();
  }, 1000);
}

function finish() {
  const secs = Math.round((Date.now() - start) / 1000);
  quizEl.hidden = true;
  resultEl.hidden = false;
  resultEl.innerHTML = `
  <h2>Quiz Complete</h2>
  <p>Right: ${right}</p>
  <p>Wrong: ${wrong}</p>
  <p>Time taken: ${secs} seconds</p>
  <p>Total score: ${right}/10</p>
  <button id="restart"><i class="bi bi-arrow-repeat"></i> Restart</button>
  <button id="menu"><i class="bi bi-list"></i> Menu</button>
  `;

document.getElementById("restart").addEventListener("click", () => {
  location.reload();
});

document.getElementById("menu").addEventListener("click", () => {
    window.location.href = "/menu.html";
    

  });
}