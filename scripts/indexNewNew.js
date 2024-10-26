const boxes = document.querySelectorAll('.boxes');
const diaLog = document.querySelector('#dialogue');
const diaLog2 = document.querySelector('#dialogue2');
function random(){
    return Math.floor(Math.random() * 4);
}

let playerTurn = 1;
let gameRun = false;
let turns = 1;
let level = 1;

let botArray = [];
let playerArray = [];

let steps = 0;

(()=>{
    document.addEventListener('keydown', (e)=>{
        if(e.code == 'Space'){
            if(gameRun){
                return;
            }

            console.log('space');
            gameRun = true;
            gameLoop();
        }
    });
})();

boxes.forEach((box, index)=>{
    box.addEventListener('click', (e)=> playerInput(e, box, index));
});

async function gameLoop(){
    title2('');
    if(!gameRun){ return end();}

    turnIndicator(playerTurn);

    if(playerTurn == 1){
        await botMove();
    }
}

function end() {
    playerTurn = 1;
    turns = 1;
    level = 1;
    botArray = [];
    playerArray = [];
    gameRun = false;
    title('Game Over!');
    title2('Press Spacebar to play again');
}

async function playerInput(e, box, index){
    if(playerTurn == 1) return;

    clickAnim(e);
    if(index == botArray[steps]){
        steps++;
        if( steps >= botArray.length ){
            playerTurn = 1;
            steps = 0;
            gameLoop();
            return;
        }
    }else{
        console.log(`index: ${index}, array: ${botArray[steps]}`);
        gameRun = false;
        steps = 0;
        gameLoop();
        return;
    }
}

async function botMove(){
    title(`Level ${level}!`);
        const AIno = random();
        botArray.push(AIno);
    for(let a = 0; a < botArray.length; a++){
        await new Promise(resolve =>{
            setTimeout(() => {
                const oldColor = boxes[botArray[a]].style.backgroundColor;
    
                boxes[botArray[a]].classList.add('click');
                boxes[botArray[a]].style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
                setTimeout(()=>{
                    boxes[botArray[a]].classList.remove('click');
                    boxes[botArray[a]].style.backgroundColor = oldColor;
                    resolve();
                }, 500); 
            }, 800);
        });
    };
    playerTurn = 0;
    level++;
    gameLoop();
}

