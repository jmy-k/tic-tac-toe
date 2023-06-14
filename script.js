const createPlayers = () => {
    const players = {};
    
    const setPlayers = () => {
      const $playerSelection = document.querySelector('#playerselection');
      const $player1 = $playerSelection.querySelector('#player1');
      const $player2 = $playerSelection.querySelector('#player2');
      
      const playerNameValidate = () =>{
        const player1Alert=document.querySelector('#player1alert');
        const player2Alert=document.querySelector('#player2alert')
        if ($player1.value===""){
            player1Alert.style.display="block";
        }
        else{
          player1Alert.style.display="none";
        }
        if ($player2.value===""){
            player2Alert.style.display="block";
        }
        else{
          player2Alert.style.display="none";
        }
        if ($player1.value!=="" && $player2.value!==""){
            players.player1 = $player1.value;
            players.player2 = $player2.value;

            return {player1: players.player1 , player2: players.player2}
        }
      }
      return playerNameValidate();
      
    };
    
    return {
      setPlayers,
      getPlayer1: () => players.player1,
      getPlayer2: () => players.player2
    };
};

const gamePlayers = createPlayers();
const startGameButton = document.querySelector('#startgame');

startGameButton.addEventListener('click', () => {
  const playersData = gamePlayers.setPlayers();
  console.log(playersData);
});


const gameBoard = () => {
    board = [];

    game = () =>{
      xMarker=document.createElement('div');
      yMarker=document.createElement('div');
      playerTurn=document.querySelector('#id');
      turn = 0;

      const gamePlayers = createPlayers();
      const player1 = gamePlayers.getPlayer1();
      const player2 = gamePlayers.getPlayer2();

      if (turn%2===0){
        playerTurn.textContent= player1+"'s turn"
      }
      else if (turn%2!==0){
        playerTurn.textContent= player2 + "'s turn"
      }
    }
}





/* players can choose either X or O but i don't know how to efficiently let players change
their options so i'm settling for a reset button for now */

const playerSelectionModule = (() => {
    function disableOppositeOptions(selectedOptionId, oppositeOption1Id, oppositeOption2Id) {
      const selectedOption = document.getElementById(selectedOptionId);
      const oppositeOption1 = document.getElementById(oppositeOption1Id);
      const oppositeOption2 = document.getElementById(oppositeOption2Id);
    
      if (selectedOption) {
        oppositeOption1.disabled = true;
        oppositeOption2.disabled = false;
      }
    }
  
    function resetSelection() {
      const selections = document.querySelectorAll('.playerchoice');
      selections.forEach((choice) => {
        choice.checked = false;
        choice.disabled = false;
      });
    }
  
    // Public methods
    return {
      disableOppositeOptions,
      resetSelection,
    };
  })();