const startButton = document.querySelector('#startGame');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timer = document.querySelector('#time');
const board = document.querySelector('#board');

const COLORS_ARR = ['red', 'yellow', 'blue', 'white', 'green'];

let time = 0;
let score = 0;

startButton.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = e.target.getAttribute('data-time');
    timer.textContent = `00:${time}`;
    screens[1].classList.add('up');
    startGame();
  }
});

function startGame() {
  const timerInterval = setInterval(() => {
    if (time === 0) {
      clearInterval(timerInterval);
      finishGame();
    }

    if (time < 10) {
      timer.textContent = `00:0${decriseTime()}`;
    } else {
      timer.textContent = `00:${decriseTime()}`;
    }
  }, 1000);

  createCircle();
}

function decriseTime() {
  return time--;
}

function createCircle() {
  const circle = document.createElement('div');
  const { width, height } = board.getBoundingClientRect();

  circle.classList.add('circle');

  const size = getRandomNumber(10, 60);
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.top = `${getRandomNumber(0, height - size)}px`;
  circle.style.right = `${getRandomNumber(0, width - size)}px`;
  circle.style.background = COLORS_ARR[getRandomNumber(0, 4)];

  circle.addEventListener('click', () => {
    score++;
    board.innerHTML = '';
    createCircle();
  });

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function finishGame() {
  timer.parentNode.classList.add('hide');
  board.innerHTML = `<h2>Счёт: <span class="primary">${score}</span></h2>`;
}
