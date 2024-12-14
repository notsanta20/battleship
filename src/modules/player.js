import { gameBoard } from "./gameBoard.js";

//player object
const createPlayer = (player)=>{
    const name = player;
    const score = 0;
    const board = gameBoard(player);
    const playedShots = new Set();
    return {
        name,score,board,playedShots
    }
}

//create 2 players
const player = () =>{
    let player1 = createPlayer(`p1`);
    let player2 = createPlayer(`p2`);  
    return {player1,player2};
};

export {player};