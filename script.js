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

        
      }
      return {player1: players.player1 , player2: players.player2}
    }
    
    const markerValidate = () =>{
      const player1MarkerAlert=document.querySelector('#player1markeralert')
      const player2MarkerAlert=document.querySelector('#player2markeralert')
      const player1X=document.querySelector('#player1-X');
      const player1O=document.querySelector('#player1-O');
      const player2X=document.querySelector('#player2-X');
      const player2O=document.querySelector('#player2-O');

      let markerSelected=false; 

      if ((player1X.checked && player1O.checked)===false){
        player1MarkerAlert.style.display='block';
        markerSelected=false;
      }
      if (player1X.checked || player1O.checked) {
        player1MarkerAlert.style.display='none';
        markerSelected=true;
        if (player1X.checked){
          players.player1Marker="X"
        }
        else if (player1O.checked){
          players.player1Marker="O"
        }
      }

      if ((player2X.checked && player2O.checked)===false){
        player2MarkerAlert.style.display='block';
        markerSelected=false;
      }
      if (player2X.checked || player2O.checked) {
        player2MarkerAlert.style.display='none';
        markerSelected=true;
        if (player2X.checked){
          players.player2Marker="X"
        }
        else if (player2O.checked){
          players.player2Marker="O"
        }
      }

      return {markerSelected, player1Marker: players.player1Marker , player2Marker:players.player2Marker};
    }
    return {playerNameValidate: playerNameValidate(), markerValidate: markerValidate()};
  };
  
  return {
    setPlayers
  };
};

const gamePlayers = createPlayers();
const startGameButton = document.querySelector('#startgame');

startGameButton.addEventListener('click', () => {
const playersData = gamePlayers.setPlayers();
const isPlayersValid = playersData && playersData.playerNameValidate.player1 && playersData.playerNameValidate.player2;
const isMarkerValid = playersData && playersData.markerValidate.player1Marker && playersData.markerValidate.player2Marker;

if (isPlayersValid && isMarkerValid) {
  const $playerSelection = document.querySelector('#playerselection');
  $playerSelection.style.display = 'none';

  const $gameBoard = document.querySelector('#gameboard');
  $gameBoard.style.display = 'grid';

  gameBoard(playersData)
}
});


const gameBoard = () => {
  const board = [];

  const game = () =>{
    const playerTurn=document.querySelector('#turn');
    const gameBoxes=document.querySelectorAll('.box')

    const playersData = gamePlayers.setPlayers();
    const player1 = playersData.playerNameValidate.player1;
    const player2 = playersData.playerNameValidate.player2;
    const player1Marker = playersData.markerValidate.player1Marker;
    const player2Marker = playersData.markerValidate.player2Marker;
    
    
    let boxesleft=9
    let turn = 0;

    if (turn % 2 === 0) {
      playerTurn.textContent = player1 + "'s turn";
    }
    else if (turn % 2 !== 0) {
      playerTurn.textContent = player2 + "'s turn";
    }
    
    const switchTurn = () => {
      turn++;
      if (turn % 2 === 0) {
        playerTurn.textContent = player1 + "'s turn";
      } else if (turn % 2 !== 0) {
        playerTurn.textContent = player2 + "'s turn";
      }
    };

    const makeMove = (box) =>{
      const xMarker=document.createElement('div');
      xMarker.textContent="X";
      const yMarker=document.createElement('div');
      yMarker.textContent="O"
      if (turn%2 === 0){
        box.appendChild(xMarker)
      }

      else if (turn%2!==0){
        box.appendChild(yMarker)
      }
      switchTurn()
    }
    
    gameBoxes.forEach((box)=>{
      if (box.hasChildNodes()!==true){
        box.addEventListener('click', makeMove.bind(null,box))
      }
      else if (box.hasChildNodes()){
        return
      }
    })

    
  }
  game()
  return {game}
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