
// GameBoard
const GameBoard = (() => {
  const boardEl = document.querySelector('.gameboard');

  let players = [];
  let playersPicks = [[], []];
  
  function resetBoard() {
    this.playersPicks = [[], []];
    console.log(playersPicks);
  }

  function addPlayers(player1, player2) {
    players.push(player1, player2);
  }

  function createPlayers() {
    const playerX = Player('testX', 'X');
    const playerO = Player('testO', 'O');
    
    this.players = [];
    
    addPlayers(playerX, playerO);
  }
  
  return { boardEl, playersPicks, resetBoard, createPlayers };
})();


// LOGIC THAT HOSTS MOVES
const GameLogic = (() => {

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
    
    if (GameBoard.playersPicks[0].includes(tileNumSelected) ||
    GameBoard.playersPicks[1].includes(tileNumSelected)) {
      return;
    }

    playerTurn = !playerTurn;
    
    const playerIdx = playerTurn ? 1 : 0;
    
    if (playerTurn) {
      e.target.textContent = 'X';
      GameDisplay.updatePlayerTurnEl('O');
    } else {
      e.target.textContent = 'O';
      GameDisplay.updatePlayerTurnEl('X');
    }

    GameBoard.playersPicks[playerIdx].push(+tileNumSelected);

    if (checkWin(GameBoard.playersPicks[playerIdx])) {
      GameDisplay.gameOver('player');
    }

    // tie
    if (GameBoard.playersPicks[0].length + GameBoard.playersPicks[1].length === 9) {
      GameDisplay.gameOver();
    }
  }

  function resetGame() {
    const replayOptionsEl = document.querySelector('.replay-options');
    const allBoardTiles = document.querySelectorAll('.tile');

    playerTurn = false;

    GameBoard.resetBoard();
    GameBoard.createPlayers();

    console.log(GameBoard.playersPicks);

    allBoardTiles.forEach(tile => {
      tile.textContent = '';
    });

    GameDisplay.updatePlayerTurnEl('X');

    replayOptionsEl.classList.add('hidden');
    GameBoard.boardEl.addEventListener('click', playerClick);
  }


  GameBoard.boardEl.addEventListener('click', playerClick);
  replayBtn.addEventListener('click', resetGame);

  return {playerClick}
})();


// HANDLES ALL OF THE DISPLAY CHANGING OF THE BOARD
const GameDisplay = (() => {
  const replayOptionsEl = document.querySelector('.replay-options');
  const endGameMessage = document.querySelector('.replay-message');
  const playerTurnEl = document.querySelector('.turn-display');

  function gameOver(player = undefined) {
    replayOptionsEl.classList.remove('hidden');
    playerTurnEl.textContent = '--';

    if (player) {
      endGameMessage.textContent = `${player} has won the game!!!`;
    } else {
      endGameMessage.textContent = 'The game has tied!!!';
    }

    GameBoard.boardEl.removeEventListener('click', GameLogic.playerClick);
  }

  function updatePlayerTurnEl(symbol) {
    playerTurnEl.textContent = symbol;
  }

  return { gameOver, updatePlayerTurnEl };
})();


// PLAYER HOSTS PLAYER INFO
function Player(name, symbol) {

  let moves = [];

  function addMove() {
  }

  return { name, symbol, addMove };
}


GameBoard.createPlayers();