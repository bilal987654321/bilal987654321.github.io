let scores, roundScore, activePlayer, gamePlaying;

init();

document.getElementById('roll-hold').addEventListener('click', function () {
  if (gamePlaying) {
    rollDice(activePlayer);
  }
});
document.getElementById('hold-1').addEventListener('click', function () {
  if (gamePlaying) {
    hold(1);
  }
});
document.getElementById('hold-2').addEventListener('click', function () {
  if (gamePlaying) {
    hold(2);
  }
});

document.getElementById('new-game').addEventListener('click', function () {
  init();
});


function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 1;
  gamePlaying = true;

  document.getElementById('round-score-1').textContent = '0';
  document.getElementById('round-score-2').textContent = '0';
  document.getElementById('global-score-1').textContent = '0';
  document.getElementById('global-score-2').textContent = '0';

  document.getElementById('dice-result').style.display = 'none';
  document.getElementById('roll-hold').disabled = false;
  document.getElementById('hold-1').disabled = false;
  document.getElementById('hold-2').disabled = false;
}

function rollDice(playerNum) {
    let dice = Math.floor((Math.random() * 1000) % 6) + 1;
    let diceDOM = document.getElementById('dice-result');
    diceDOM.style.display = 'block';
    diceDOM.src = 'img/dice-' + dice + '.png';
    if (dice !== 1) {
      roundScore += dice;
      document.getElementById('round-score-' + playerNum).textContent = roundScore;
    } else {
      roundScore = 0;
      document.getElementById('round-score-' + playerNum).textContent = '0';
      nextPlayer();
    }
  }


function hold(playerNum) {
  saveScore(playerNum);

  if (scores[playerNum - 1] >= 100) {
    document.getElementById('global-score-' + playerNum).textContent = 'Winner!';
    document.getElementById('dice-result').style.display = 'none';
    document.getElementById('winner').textContent = "Winner is Player "+playerNum;
    gamePlaying = false;
  } else {
    nextPlayer();
  }
}

function nextPlayer() {
  roundScore = 0;
  document.getElementById('round-score-' + activePlayer).textContent = '0';
  activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
}

function saveScore(playerNum) {
  scores[playerNum - 1] += roundScore;
  document.getElementById('global-score-' + playerNum).textContent = scores[playerNum - 1];
}

function endTurn() {
  nextPlayer();
}
