
// GAMEBOARD
const Gameboard = (() => {
  let players = [];
  let playersPicks = [[], []];
  
  function resetBoard() {
    playersPicks = [[], []];
  }

  function addPlayers(player1, player2) {
    players.push(player1, player2);
  }

  function createPlayers() {
    const playerX = Player('testX', 'X');
    const playerO = Player('testO', 'O');
    
    players = [];
    
    addPlayers(playerX, playerO);
  }
  
  return { playersPicks, resetBoard, createPlayers };
})();


// LOGIC THAT HOSTS MOVES
const GameLogic = (() => {

  const boardEl = document.querySelector('.gameboard');
  const replayBtn = document.querySelector('.replay-btn');

  let playerTurn = false;
  const winningScores = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  function checkWin(picks) {
    return winningScores.some(game => {
      return game.every(tileNum => picks.includes(tileNum));
    });
  }

  function playerClick(e) {
    
    if (!e.target.classList.contains('tile')) return;
    
    const tileNumSelected = e.target.dataset.tilenum;
    
    if (Gameboard.playersPicks[0].includes(tileNumSelected) ||
    Gameboard.playersPicks[1].includes(tileNumSelected)) {
      return;
    }

    playerTurn = !playerTurn;
    
    const playerIdx = playerTurn ? 1 : 0;

    const turnElement = document.querySelector('.turn-display');
    
    if (playerTurn) {
      e.target.textContent = 'X';
      turnElement.textContent = 'O'
    } else {
      e.target.textContent = 'O';
      turnElement.textContent = 'X'
    }

    Gameboard.playersPicks[playerIdx].push(+tileNumSelected);

    if (checkWin(Gameboard.playersPicks[playerIdx])) {
      gameOver();
    }
  }

  // change this to game display object
  function gameOver(outcome, player) {
    const replayOptionsEl = document.querySelector('.replay-options');
    const turnElement = document.querySelector('.turn-display');  // change to game display

    replayOptionsEl.classList.remove('hidden');
    turnElement.textContent = '';

    boardEl.removeEventListener('click', playerClick);
  }

  function resetGame() {
    const replayOptionsEl = document.querySelector('.replay-options');
    const allBoardTiles = document.querySelectorAll('.tile');

    Gameboard.resetBoard();
    Gameboard.createPlayers();

    allBoardTiles.forEach(tile => {
      tile.textContent = '';
    });

    replayOptionsEl.classList.add('hidden');
    boardEl.addEventListener('click', playerClick);
  }


  boardEl.addEventListener('click', playerClick);
  replayBtn.addEventListener('click', resetGame);
  

  return {}
})();


// HANDLES ALL OF THE DISPLAY CHANGING OF THE BOARD
function GameDisplay() {
  return {};
}


// PLAYER HOSTS PLAYER INFO
function Player(name, symbol) {

  let moves = [];

  function addMove() {
  }

  return { name, symbol, addMove };
}


Gameboard.createPlayers();







