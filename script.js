
const openPlayers = document.querySelector('#start')
const playerForm=document.querySelector('#playerselection')

openPlayers.addEventListener('click',()=>{
  playerForm.style.display="block";
  openPlayers.style.display='none';
})

const createPlayers = () => {
  const setPlayers = () => {
    const players = {};
    const $playerSelection = document.querySelector('#playerselection');
    const $player1 = $playerSelection.querySelector('#player1');
    const $player2 = $playerSelection.querySelector('#player2');
    
    /* check if player names are filled in */
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

      /* adds keys to the players object that was defined above */
      if ($player1.value!=="" && $player2.value!==""){
        players.player1 = $player1.value;
        players.player2 = $player2.value;
      }

      /* playerNameValidate.player1/playerNameValidate.player2 will equal to whatever was typed into the
      form, which was added to the players object  and returned to the playerValidate function*/ 
      return {player1: players.player1 , player2: players.player2}
    }
    
    /*check if markers are all selected */
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

      /* markers are added as keys to the players object defined above */
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

      /* returns those keys defined above to markerValidate() as player1Marker and player2Marker */
      return {markerSelected, player1Marker: players.player1Marker , player2Marker:players.player2Marker};
    }

    /* returns these two functions as setPlayer.playerNameValidate and setPlayer.markerValidate and those will have the 
    player's names and markers values
    also returns the players object, which should have all of the player names and markers */
    return {playerNameValidate: playerNameValidate(), markerValidate: markerValidate(), players};
  };
  
  return {
    setPlayers 
  };
};

const startGameButton = document.querySelector('#startgame');

/* when player clicks "Lets Go" and names + markers are filled in/selected, the game will start */
startGameButton.addEventListener('click', () => {
  const playersData = createPlayers().setPlayers();
  const isPlayersValid = playersData && playersData.players.player1 && playersData.players.player2;
  const isMarkerValid = playersData && playersData.players.player1Marker && playersData.players.player2Marker;

  if (isPlayersValid && isMarkerValid) {
    const $playerSelection = document.querySelector('#playerselection');
    const gameTitle=document.querySelector('.title')
    $playerSelection.style.display = 'none';
    gameTitle.style.display='none';

    const $gameBoard = document.querySelector('#gameboard');
    $gameBoard.style.display = 'grid';

    gameBoard(playersData)
  }
});


const gameBoard = (playersData) => {
  const game = () =>{
    const playerTurn=document.querySelector('#turn');
    const gameBoxes=document.querySelectorAll('.box')

    /* defining these again so i don't have to type out as much */
    const player1 = playersData.players.player1;
    const player2 = playersData.players.player2;
    const player1Marker = playersData.players.player1Marker;
    const player2Marker = playersData.players.player2Marker;
    
    let player1Boxes = []
    let player2Boxes=[]
    /* if any of these combos are found in the above player boxes, then that player wins */
    const valuesToFind = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
    
    let boxesleft=9
    let turn = 0;

    /* sets the initial player's turn */
    if (turn % 2 === 0) {
      playerTurn.textContent = player1 + "'s turn";
    }
    else if (turn % 2 !== 0) {
      playerTurn.textContent = player2 + "'s turn";
    }
    
    /* this will be called every time a player makes a move */
    const switchTurn = () => {
      turn++;
      if (turn % 2 === 0) {
        playerTurn.textContent = player1 + "'s turn";
      } else if (turn % 2 !== 0) {
        playerTurn.textContent = player2 + "'s turn";
      }
    };

    

    /* when a player wins or when there are no boxes left, this is called */
    const gameOver=() =>{
      /* play again? pops up */
      const gameOverPopUp = document.querySelector('#gameover');
      const gameResult = document.querySelector('#gameresult')
      gameOverPopUp.style.display="grid";
      gameResult.textContent = playerTurn.textContent;

      const playAgain=document.querySelector('#playagain');
      const endGame=document.querySelector('#endgame')

      const resetPlayerInfo =(()=>{
        document.location.reload()
      })
      
      /* empties the players boxes, resets the turn + boxesleft, removes all markers from the grid */
      const resetDisplays=(()=>{
        player1Boxes=[]
        player2Boxes=[]
        turn = 0
        boxesleft = 9
        const gameBoxes=document.querySelectorAll('.box')
        gameBoxes.forEach((box)=>{
          if (box.hasChildNodes()){
          box.removeChild(box.firstChild)
          }
        })
      })

      /* resets the game, but retains the names and selected markers */
      playAgain.addEventListener('click',()=>{
        resetDisplays()
        playerTurn.textContent=playerTurn.textContent = player1 + "'s turn";
        gameOverPopUp.style.display="none";
      })

      /* resets the games and player names + markers */
      endGame.addEventListener('click',()=>{
        resetDisplays()

        /* resets more displays so it looks like what it did at the very start of game */
        const $gameBoard = document.querySelector('#gameboard');
        const gameTitle=document.querySelector('.title')
        const openPlayers = document.querySelector('#start')
        playerTurn.textContent="";
        $gameBoard.style.display = 'none';
        openPlayers.style.display='block';
        gameTitle.style.display='block';
        gameResult.textContent="";
        gameResult.style.display='none';
        gameOverPopUp.style.display='none';

        resetPlayerInfo(playersData)
        
      })

      
    }

    /* called every time a move is made */
    const checkWinner=()=>{
      /* iterates through every subarray in valuesToFind to see if any of those
      combinations are found in each player's boxes array */
      const player1Wins = valuesToFind.some((subarray)=>{ 
        return subarray.every((value)=>player1Boxes.includes(value))
      })
      const player2Wins = valuesToFind.some((subarray)=>{
        return subarray.every((value)=>player2Boxes.includes(value))
      })
      if (player1Wins===true){
        playerTurn.textContent=(player1+" wins!");
        gameOver()
      }
      else if (player2Wins===true){
        playerTurn.textContent=(player2+" wins!");
        gameOver()
      }
      else if (boxesleft<=0){
        playerTurn.textContent="Tie! No boxes left.";
        gameOver()
      }
      
    }

    const makeMove = (box) =>{
      checkWinner()
      box.classList.remove('unchecked')
      const xMarker=document.createElement('div');
      xMarker.classList.add('Xmark');
      xMarker.textContent="X";
      const yMarker=document.createElement('div');
      yMarker.classList.add('Omark');
      yMarker.textContent="O";
      
      /* if the box is empty, player is allowed to add their marker. this is already checked
      when adding the event listeners below so i'm not sure if thisnis necessary */
      if(!box.lastElementChild){
      
        if (turn%2 === 0){ /* player 1's turn */
          if (player1Marker==="X"){
            box.appendChild(xMarker)
          }
          else if (player1Marker==="O"){
            box.appendChild(yMarker)
          }
          player1Boxes.push(Number(box.id))
        }

        else if (turn%2!==0){ /* player 2's turn */
          if (player2Marker==="X"){
            box.appendChild(xMarker)
          }
          else if (player2Marker==="O"){
            box.appendChild(yMarker)
          }
          player2Boxes.push(Number(box.id))
        }
        boxesleft-=1;
        switchTurn()
        checkWinner()
        console.log(player1Boxes)
        console.log(player2Boxes)

      }
    }
    
    /* if box is empty, the event listener is added */
    gameBoxes.forEach((box)=>{
      if (box.hasChildNodes()){
        return
      }
      else { 
        box.addEventListener('click', makeMove.bind(null,box))
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