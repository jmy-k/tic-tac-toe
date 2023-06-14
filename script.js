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
        if ($player2.value===""){
            player2Alert.style.display="block";
        }
        else{
            players.player1 = $player1.value;
            players.player2 = $player2.value;

            return {player1: players.player1 , player2: players.player2}
        }
      }
      return playerNameValidate;
      
    };
    
    return {
      setPlayers,
      getPlayer1: () => players.player1,
      getPlayer2: () => players.player2
    };
};


const gameBoard = () => {
    board = [];
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