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
    let currentPlayerTag = `p2`;
    let currentBoard = allPlayers.player2.board.board;
    let currentPlayer = allPlayers.player1;
    let winner = false;
    let isHit = false;
    let currX = 0; 
    let currY = 0; 

    const event = ()=>{
        const divContainer = document.querySelectorAll(`.container`);
        for(let divs of divContainer){
            divs.addEventListener('click',event=>{
                const player = event.target.dataset.player;
                if(player === currentPlayerTag){
                    const x = parseInt(event.target.dataset.x);
                    const y = parseInt(event.target.dataset.y);
                    receiveAttack(x,y,currentPlayer.playedShots,currentBoard);
                    if(computer && currentPlayerTag === `p1`){
                        aiMove();
                    }
                }
            });
        }
    }

    const receiveAttack = (x,y,shots,currentBoard) => {
        if(!shots.has(`${x}${y}`)){
           const ship = currentBoard[x][y];
           shots.add(`${x}${y}`);
           if(!ship){
                message.textContent = `waterrrr${currentPlayer.name}`;
                changeStatus();
                isHit = false;
           }
           else{
                ship.hit();
                ship.isSunk();
                isHit = true;
                if(ship.sunkStat){
                    currentPlayer.score++;
                    if(currentPlayer.score === 5) winner = true;
                    message.textContent = `its an HITT!!! The ship has sunk${currentPlayer.name}`;
                }
                else{
                    message.textContent = `its an HITT!!${currentPlayer.name}`;
                }
                getWinner();
                if(computer && currentPlayerTag === `p1`){
                    aiMove();
                }
           }
       }
   };

   const aiMove = ()=>{
        let x,y;
        let nextMoves = Math.floor(Math.random() * 4);
        if(isHit){
            let m = currX;
            let n = currX;
            if(nextMoves === 0) m--;
            if(nextMoves === 1) m++;
            if(nextMoves === 2) n--;
            if(nextMoves === 4) n++;

            if((m > -1 && m < 10) && (n > -1 && n < 10)){
                x = m;
                y = n;
            }
            else{
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
        receiveAttack(x,y,currentPlayer.playedShots,currentBoard);
   }

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
   }

   const getWinner = ()=>{
    if(winner){
        console.log(`Winner`);
        const main = document.querySelector(`.main-container`);
        main.innerHTML = ``;
    }
   }


   event();

};



export {playGame};