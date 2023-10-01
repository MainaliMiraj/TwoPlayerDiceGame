"use strict";

const howToPlay = document.querySelector(".ins");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const rollBtn = document.querySelector(".btn--roll");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const playerZero = document.querySelector(".player--0");
const playerOne = document.querySelector(".player--1");
const close = document.querySelector(".close");
//
const popup = document.getElementById(".para");

let playing, currentScore, scores, activePlayer;

const init = function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  playerZero.classList.remove("player--winner");
  playerOne.classList.remove("player--winner");
  playerZero.classList.add("player--active");
  playerOne.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  if (playing) {
  }
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerZero.classList.toggle("player--active");
  playerOne.classList.toggle("player--active");
};

rollBtn.addEventListener("click", function () {
  if (playing) {
    const rolledDiceNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${rolledDiceNumber}.png`;

    if (rolledDiceNumber !== 1) {
      currentScore += rolledDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else switchPlayer();
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.getElementById(`score--${activePlayer}`).style.color = "white";

      diceEl.classList.add("hidden");
    } else switchPlayer();
  }
});
newBtn.addEventListener("click", init);

//Instruction

howToPlay.addEventListener("click", function () {
  document.querySelector(".para").classList.remove("hid");
  document.querySelector(".close").classList.toggle("hid");
});

close.addEventListener("click", function () {
  document.querySelector(".para").classList.add("hid");
  close.classList.add("hid");
});

function closePopup() {
  document.querySelector(".para").classList.add("hid");
  close.classList.add("hid");
  howToPlay.blur();
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePopup();
  }
});
