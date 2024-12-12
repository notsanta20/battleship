import { gameBoard } from "./gameBoard.js";
import { computerMoves } from "./computerMoves.js";

const createPlayer = (player)=>{
    const name = player;
    const score = 0;
    const board = gameBoard(player);
    const playedShots = new Set();
    return {
        name,score,board,playedShots
    }
}

const player = () =>{
    let player1 = createPlayer(`p1`);
    let player2 = createPlayer(`p2`);  
    return {player1,player2};
};


const playGame = (computer)=>{
    const allPlayers = player();
    const message = document.querySelector(`.message`);
    const winMessage = document.querySelector(`.win-message`);
    const containerX = document.querySelector(`.container`).children;
    const playerOneScore = document.querySelector(`.player-1-score`);
    const playerTwoScore = document.querySelector(`.player-2-score`);
    let currentPlayerTag = `p2`;
    let currentBoard = allPlayers.player2.board.board;
    let currentPlayer = allPlayers.player1;
    let winner = false;
    let isHit = false;
    let currX = 0; 
    let currY = 0; 
    let timeOut = true;
    console.log(allPlayers.player1.board);
    const event = ()=>{
        const divContainer = document.querySelectorAll(`.container`);
        for(let divs of divContainer){
            divs.addEventListener('click',event=>{
                if(timeOut){
                    const player = event.target.dataset.player;
                    if(player === currentPlayerTag){
                        const x = parseInt(event.target.dataset.x);
                        const y = parseInt(event.target.dataset.y);
                        receiveAttack(x,y,currentPlayer.playedShots,currentBoard,event.target);
                        setTimeout(()=>{
                            if(computer && currentPlayerTag === `p1`){
                                aiMove(currX,currY,containerX);
                            }                                
                        },5000)
                    }
                }
            });
        }
    }
    
    const receiveAttack = (x,y,shots,currentBoard,target) => {
        if(!shots.has(`${x}${y}`)){
           const ship = currentBoard[x][y];
           shots.add(`${x}${y}`);
           target.textContent = `X`;
           message.classList.add(`animation`);
           timeOut = false;

           if(!ship){
            message.textContent = `The missile has hit the water.`;
            isHit = false;
            setTimeout(()=>{
                changeStatus();
            },3000)
           }
           else{
            setTimeout(() => {
                timeOut = true;
            }, 3000);
            ship.hit();
            ship.isSunk();
            isHit = true;
            if(ship.sunkStat){
                currentPlayer.score++;
                if(currentPlayer.score === 5) winner = true;
                message.textContent = `its an HITT!!! The missile has hit the ship and the ship has sunk`;
                updateScore(currentPlayer,computer);
            }
            else{
                message.textContent = `its an HITT!! The missile has hit the ship`;
            }
            getWinner();
            setTimeout(()=>{
                if(computer && currentPlayerTag === `p1`){
                    aiMove(currX,currY,containerX);
                }                                
            },5000)
           }
           setTimeout(() => {
            message.classList.remove(`animation`);
           }, 3000);

           displayTurn();
       }
   };

   const changeStatus = ()=>{
    currentPlayerTag === `p2` ? currentPlayerTag = `p1` : currentPlayerTag = `p2`;
    if(currentPlayerTag === `p2`){
        currentPlayer = allPlayers.player1;
        currentBoard = allPlayers.player2.board.board;
    }
    else{
        currentPlayer = allPlayers.player2;
        currentBoard = allPlayers.player1.board.board;
    }
    timeOut = true;
   }

   const aiMove = ()=>{
    let x,y;
    if(isHit){
        let nextMoves = Math.floor(Math.random() * 4);
        x = currX;
        y = currY;
        if(nextMoves === 0) x--;
        if(nextMoves === 1) x++;
        if(nextMoves === 2) y--;
        if(nextMoves === 3) y++;

        if((x < -1 && x > 10) && (y < -1 && y > 10)){
            while(currentPlayer.playedShots.has(`${x}${y}`)){
                [x,y] = computerMoves();
            }
        }    
    }
    else{
        [x,y] = computerMoves();
        while(currentPlayer.playedShots.has(`${x}${y}`)){
            [x,y] = computerMoves();
        }
    }
    currX = x;
    currY = y;
    let containerY = containerX.item(y).children;
    let target = containerY.item(x);
    receiveAttack(x,y,currentPlayer.playedShots,currentBoard,target);
}

   const getWinner = ()=>{
    if(winner){
        const page3 = document.querySelector(`.page-3`);
        const page4 = document.querySelector(`.page-4`);
        const main = document.querySelector(`.main-container`);
        page3.style.display = `none`;
        page4.style.display = `flex`;
        if(allPlayers.player1.score > allPlayers.player2.score){
            winMessage.textContent = `You WON!!! You have destroyed all the enemy ships`;
        }
        else{
            winMessage.textContent = `Computer WON!!! all your ship were destroyed`;
        }
        main.innerHTML = ``;
    }
   }

   const displayTurn = ()=>{
    setTimeout(()=>{
        if(currentPlayerTag === `p2`){
            message.textContent = `Player 1's turn`
        }
        else{
            if(computer){
                message.textContent = `Computer's turn`
            }
            else{
                message.textContent = `Player 2's turn`
            }
        }
       },3000);
   };

   const updateScore = (player,ai)=>{
    if(player === `p2`){
        playerOneScore.textContent = `Player 1 Score - ${player.score}`;
    }
    else{
        if(ai){
            playerTwoScore.textContent = `Computer Score - ${player.score}`;
        }
        else{
            playerTwoScore.textContent = `Player 2 Score - ${player.score}`;
        }
    }
   }

   event();
};



export {playGame};