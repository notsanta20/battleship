//generate random x,y coords for computer
const computerMoves = ()=>{
    const randomMove = ()=>{
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        return [x,y];
    };

    const nextMove = (x,y)=>{
        const patternNum = Math.floor(Math.random() * 4);
        let m = x;
        let n = y;
        if(patternNum === 0) m++;
        if(patternNum === 1) m--;
        if(patternNum === 2) n++;
        if(patternNum === 3) n--;

        if(m < 0 || m > 9 || n < 0 || n > 9){
            [m,n] = randomMove();
        }
        return [m,n];
    };

    return{randomMove, nextMove};
};

export {computerMoves};