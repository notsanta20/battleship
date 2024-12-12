import "./output.css"

import { playGame } from "./modules/player";


const startBtn = document.querySelector(`.start-btn`);
const pageOne = document.querySelector(`.page-1`);
const pageTwo = document.querySelector(`.page-2`);
const pageThree = document.querySelector(`.page-3`);
const pageFour = document.querySelector(`.page-4`);
const choosePlayers = document.querySelectorAll(`.choose-player`);
const playAgainBtn = document.querySelector(`.play-again`);

startBtn.addEventListener(`click`, ()=>{
    pageOne.style.display = `none`;
    pageTwo.style.display = `flex`;
});

choosePlayers.forEach(player=>{
    player.addEventListener(`click`, ()=>{
        pageTwo.style.display = `none`;
        pageThree.style.display = `flex`;

        const play = parseInt(player.dataset.play);
        playGame(play);
    });
});

playAgainBtn.addEventListener(`click`, ()=>{
    const playerOneScore = document.querySelector(`.player-1-score`);
    const playerTwoScore = document.querySelector(`.player-2-score`);

    pageFour.style.display = `none`;
    pageOne.style.display = `flex`;
    document.querySelector(`.message`).textContent = ``;
    playerOneScore.textContent = `Player 1 Score - 0`;
    playerTwoScore.textContent = `Player 2 Score - 0`;

});
