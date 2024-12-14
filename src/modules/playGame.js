import { computerMoves } from "./computerMoves";
import { player } from "./player";

//start game
const playGame = (computer)=>{
    const allPlayers = player();
    const message = document.querySelector(`.message`);
    const winMessage = document.querySelector(`.win-message`);
    const divX = document.querySelector(`.container`).children;
    const playerOneScore = document.querySelector(`.player-1-score`);
    const playerTwoScore = document.querySelector(`.player-2-score`);

    let currTag = `p2`;
    let currBoard = allPlayers.player2.board.board;
    let currPlayer = allPlayers.player1;
    let winner = false;
    let isHit = false;
    let currX = 0; 
    let currY = 0; 
    let timeOut = true;

    //onclick event
    const event = ()=>{
        const divContainer = document.querySelectorAll(`.container`);

        for(let div of divContainer){
            div.addEventListener('click',event=>{
                if(timeOut){
                    const player = event.target.dataset.player;
                    const x = parseInt(event.target.dataset.x);
                    const y = parseInt(event.target.dataset.y);
                    if(computer){
                        if(player === `p2`){
                            receiveAttack(x,y,event.target);
                            setTimeout(()=>{
                                if(currTag === `p1`){
                                    aiMove();
                                }                                
                            },5000);
                        }
                    }
                    else{
                        if(player === currTag){
                            receiveAttack(x,y,event.target);
                        }
                    }
                }
            });
        }
    }
    
    //receive attack and modify changes
    const receiveAttack = (x,y,target) => {
        if(!currPlayer.playedShots.has(`${x}${y}`)){
           const ship = currBoard[x][y];
           currPlayer.playedShots.add(`${x}${y}`);
           target.textContent = `X`;
           message.classList.add(`animation`);
           timeOut = false;

           if(!ship){
                message.textContent = `The missile has hit the water.`;
                isHit = false;

                setTimeout(()=>{
                    changeStatus();
                },3000);
           }
           else{
                setTimeout(()=>{
                    timeOut = true;                              
                },3000);

                ship.hit();
                ship.isSunk();
                isHit = true;

                if(ship.sunkStat){
                        currPlayer.score++;
                        if(currPlayer.score === 5) winner = true;
                        message.textContent = `its an HITT!!! The missile has hit the ship and the ship has sunk`;

                        updateScore(currPlayer,computer);
                }
                else{
                        message.textContent = `its an HITT!! The missile has hit the ship`;
                }

                getWinner();

                setTimeout(()=>{
                    if(computer && currTag === `p1`){
                        aiMove();
                    }                                
                },5000);
           }
           setTimeout(()=>{
            message.classList.remove(`animation`);
           },3000);
           displayTurn();
       }
    };

    //change status for player's turn
    const changeStatus = ()=>{
        if(currTag === `p2`){
            currTag = `p1`;
            currBoard = allPlayers.player1.board.board;
            currPlayer = allPlayers.player2;
        }
        else{
            currTag = `p2`;
            currBoard = allPlayers.player2.board.board;
            currPlayer = allPlayers.player1;
        }

        timeOut = true;
    }

    //computer moves
    const aiMove = ()=>{
        const move = computerMoves();
        let x,y;

        if(isHit){
            [x,y] = move.nextMove(currX,currY);
            while(currPlayer.playedShots.has(`${x}${y}`)){
                [x,y] = move.randomMove();
            }          
        }
        else{
            [x,y] = move.randomMove();
            while(currPlayer.playedShots.has(`${x}${y}`)){
                [x,y] = move.randomMove();
            }
        }

        currX = x;
        currY = y;

        let divY = divX.item(y).children;
        let target = divY.item(x);

        receiveAttack(x,y,target);
    }
    
    //get the winner
    const getWinner = ()=>{
    if(winner){
        const page3 = document.querySelector(`.page-3`);
        const page4 = document.querySelector(`.page-4`);
        const main = document.querySelector(`.main-container`);

        page3.style.display = `none`;
        page4.style.display = `flex`;

        if(allPlayers.player1.score > allPlayers.player2.score){
            if(computer){
                winMessage.textContent = `You WON!!! You have destroyed all the enemy ships`;
            }
            else{
                winMessage.textContent = `Player 1 WON!!! player 2's ships were destroyed`;
            }
        }
        else{
            if(computer){
                winMessage.textContent = `Computer WON!!! all your ships were destroyed`;
            }
            else{
                winMessage.textContent = `Player 2 WON!!! player 1's ships were destroyed`;
            }
        }
        
        main.innerHTML = ``;
    }
    }

   //display player's turn in DOM
   const displayTurn = ()=>{
    setTimeout(()=>{
        if(currTag === `p2`){
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

   //update scores in DOM
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