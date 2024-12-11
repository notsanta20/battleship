const createBoard = (board,player)=>{
    const mainContainer = document.querySelector(`.main-container`);
    const container = document.createElement(`div`);
   
    container.classList.add(`container`);
    mainContainer.append(container);

    for(let i = 0; i < 10; i++){
        const div = document.createElement(`div`);
        div.classList.add(`box`);
        container.append(div);
        for(let j = 0; j < 10; j++){
            const child = document.createElement(`div`);
            child.classList.add(`box`);
            if(board[j][i]){
                child.classList.add(`ship`);
            }
            else{
                child.classList.add(`water`);
            }
            child.dataset.x = j;
            child.dataset.y = i;
            child.dataset.player = player;
            div.append(child);
        }
    }
}

export {createBoard};