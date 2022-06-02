
const gameBoard = (() => {
  // Elements
  const boardEl = document.querySelector('.gameboard');

  // Game state
  let playerTurn = false;
  let playersPicks = [[], []];
  const winningScores = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  // Game logic
  function resetGame() {
    playersPicks = [[], []];
  }

  function checkWin(picks) {
    const test = winningScores.some(game => {
      return game.every(tileNum => picks.includes(tileNum));
    });

    console.log(test);
  }

  function playerClick(e) {
    if (!e.target.classList.contains('tile')) return;

    if (e.target.classList.contains('active')) {
      console.log('already clicked that!');
      return;
    };

    playerTurn = !playerTurn;
    const playerIdx = playerTurn ? 1 : 0;

    e.target.classList.add('active');
    
    if (playerTurn) {
      e.target.textContent = 'X';
    } else {
      e.target.textContent = 'O';
    }

    playersPicks[playerIdx].push(+e.target.dataset.tilenum);

    // if win
      // display winner,
      // show replay button
    checkWin(playersPicks[playerIdx]);
  }


  // Event Listeners
  boardEl.addEventListener('click', playerClick);

  return { playersPicks, resetGame };
})();



// TODO
// 1. create players
// 2. store players in playerPicks array (change name)
//  2a. check score with playerX.picks, playerY.picks