'use strict';

// Select the Element
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const currentSc1 = document.getElementById('current--0');
const currentSc2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const reset = document.querySelector('.btn--new');

// Define the variable that can be accessiable for all
let active, playing, score, currentScore;

const initial = function () {
  // Asign the values to the variables
  score = [0, 0];
  currentScore = 0;
  active = 0;
  playing = true;

  currentSc1.textContent = 0;
  currentSc2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  dice.classList.add('hidden');

  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
// Initial condition
initial();

const switchPlayer = function () {
  // Change the active currentScore to 0
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;

  // Switch to next player
  active = active === 0 ? 1 : 0;

  // // toggle function checks if the class is present or not if present then remove it and if not then add it
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// Rolling the dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1) Generate random number
    const randomNumber = Math.trunc(Math.random() * 6) + 1;

    //2) Show the dice-image
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNumber}.png`;

    // Checked for roll 1
    if (randomNumber !== 1) {
      // Increase the currentScore with change in random number
      currentScore += randomNumber;

      // Add dice to the activeCurrentScore
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding the Total Score
holdBtn.addEventListener('click', function () {
  if (playing) {
    // Add current score to active players score
    score[active] += currentScore;
    document.getElementById(`score--${active}`).textContent = score[active];
    // if score >= 100 finish the game
    if (score[active] >= 20) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${active}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// RESET
reset.addEventListener('click', initial);
