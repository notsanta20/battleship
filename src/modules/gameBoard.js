import { createBoard,event } from "./domElements";

class Ship{
    constructor(size){
        this.length = size;
        this.hitNos = 0;
        this.sunkStat = false;
    }

    hit(){
        this.hitNos ++;
    }

    isSunk(){
        this.hitNos >= this.length ? this.sunkStat = true : this.sunkStat = false;
    }
}

const gameBoard = (player) => {
    const board = new Array(10);
    for(let i = 0; i < board.length; i++) {
        board[i] = new Array(10).fill(0);
    }
    const shipLength = [5,4,3,2,2];


    //generate coordinates and place ships
    const placeShip = (size) => {
        const ship = new Ship(size);
        
        //generate random coordinates
        const generateCord = ()=>{
            //generate starting coordinates
            const generateStart = ()=>{
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                return [x,y];
            }

            let coord = [generateStart()];
            let [x,y] = coord[0];

            //choose random pattern for rest of the coordinates
            const num = Math.floor(Math.random()*4);
            for(let i = 1; i < size;  i++){
               if(num === 0) coord.push([x,--y]); 
               if(num === 1) coord.push([x,++y]); 
               if(num === 2) coord.push([++x,y]); 
               if(num === 3) coord.push([--x,y]); 
            }

            //check if all coordinates are valid and free
            for(let post of coord){
                const [m,n] = post;
                if((m > -1 && m < 10) && (n > -1 && n < 10)){
                    if(board[m][n]){
                        return generateCord();
                    }
                }
                else{
                    return generateCord();
                }
            }
            return coord;
        }
        
        const position = generateCord();

        //place ship on coordinates
        position.forEach(post=>{
            const [x,y] = post;
            board[x][y] = ship;
        });        
    }

    //place 6 ships randomly
    shipLength.forEach(ship=>{
        placeShip(ship);
    });

    // //receive attack
    // const receiveAttack = (x,y) => {
    //     //check if shot is already played and attack
    //     if(!playedShots.has(`${x}${y}`)){
    //         const ship = board[x][y];
    //         playedShots.add(`${x}${y}`);
    //         if(!ship){
    //             console.log(`waterrrr`);
    //         }
    //         else{
    //             ship.hit();
    //             ship.isSunk();
    //             if(ship.sunkStat){
    //                 totalShipsSunk++;
    //                 console.log(`its an HITT!!! The ship has sunk`);
    //             }
    //             else{
    //                 console.log(`its an HITT!!`);
    //             }
    //         }
    //     }
    // }

    //print board
    const printBoard = ()=>{
        console.log(board);
    };

    //create board in DOM
    createBoard(board,player);

    // event(receiveAttack,`p1`);
    return {printBoard,board};
};

//check if shot is already played and attack
// const receiveAttack = (x,y,shots,currentBoard) => {
//      if(!shots.has(`${x}${y}`)){
//         const ship = currentBoard[x][y];
//         shots.add(`${x}${y}`);
//         if(!ship){
//             console.log(`waterrrr`);
//         }
//         else{
//             ship.hit();
//             ship.isSunk();
//             if(ship.sunkStat){
//                 totalShipsSunk++;
//                 console.log(`its an HITT!!! The ship has sunk`);
//             }
//             else{
//                 console.log(`its an HITT!!`);
//             }
//         }
//     }
// };

export{gameBoard};