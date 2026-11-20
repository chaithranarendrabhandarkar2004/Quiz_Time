const slides = document.querySelectorAll('.slide');
const count = document.getElementById('count');
let current = 0;

function show(i) {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
  count.textContent = (i + 1) + '/' + slides.length;
}

document.getElementById('next').addEventListener('click', () => {
  current = (current + 1) % slides.length;
  show(current);
});

document.getElementById('prev').addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  show(current);
});

show(0);


const level2Btn = document.getElementById("level2Btn");
const level3Btn = document.getElementById("level3Btn");

setTimeout(() => {

    level2Btn.disabled = false;
    level2Btn.textContent = "Play Now";

    level2Btn.parentElement?.classList.remove("locked");

    console.log("Level 2 unlocked!");

}, threeDays);

setTimeout(() => {

    level3Btn.disabled = false;
    level3Btn.textContent = "Play Now";

    level3Btn.parentElement?.classList.remove("locked");

    console.log("Level 3 unlocked!");

}, sevenDays);
