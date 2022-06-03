

const Gameboard = (() => {
  let players = [];
  let playersPicks = [[], []];
  
  function resetGame() {
    playersPicks = [[], []];
  }

  function addPlayers(player1, player2) {
    players.push(player1, player2);
  }
  
  return { playersPicks, resetGame };
})();


function GameLogic() {
  let playerTurn = false;

  const winningScores = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ]; 


  function checkWin(picks) {
    const test = winningScores.some(game => {
      return game.every(tileNum => picks.includes(tileNum));
    });

    console.log(test);
  }
  
  function playerClick(e) {


    // if (!e.target.classList.contains('tile')) return;

    // if (e.target.classList.contains('active')) {
    //   console.log('already clicked that!');
    //   return;
    // };

    // playerTurn = !playerTurn;
    // const playerIdx = playerTurn ? 1 : 0;

    // e.target.classList.add('active');
    
    // if (playerTurn) {
    //   e.target.textContent = 'X';
    // } else {
    //   e.target.textContent = 'O';
    // }

    // playersPicks[playerIdx].push(+e.target.dataset.tilenum);

    // // if win
    //   // display winner,
    //   // show replay button
    //   // lock the board (remove event listener?)
    // checkWin(playersPicks[playerIdx]);
  }

  return {}
}


function Player(name, symbol) {

  let moves = [];

  const addMove = () => {
    // check that move isnt taken in gameboard
    // 
  }

  return { name, symbol, addMove };
}



// ON START