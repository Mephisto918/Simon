const boxes = document.querySelectorAll('.boxes');
const diaLog = document.querySelector('#dialogue');
function random(){
    return Math.floor(Math.random() * 4);
}

let playerTurn = 1;
let gameRun = true;
let turns = 1;
let level = 1;

let botArray = [];
let playerArray = [];

let steps = 0;

function init(){
    console.log('init');
    gameLoop();
}

boxes.forEach((box, index) =>{
    // box.removeEventListener('click', playerInput);
    box.addEventListener('click', (e)=> playerInput(e, box, index));
    // box.addEventListener('click', ()=> gameLoop(e, box, index));
    // box.addEventListener('click', playerInput, {once: true});
});

function gameLoop(){
    if(gameRun){
        if(playerTurn == 1){
            botMove();
            // botArraysMove();
        }else if(playerTurn == 0){
            console.log('player');
            // playerInput({target: box});
        }
        console.log('main');
    }else{
        playerTurn = 1;
        gameRun = true;
        turns = 1;
        level = 1;

        botArray = [];
        playerArray = [];

        gameRun = true;
        gameLoop();
    }
}


async function playerInput(e, box, index){
    if(playerTurn == 1) return;

    console.log('inside functuib before if ', steps);

    clickAnim(e);
    if(index == botArray[steps]){
        console.log(steps);
        console.log('correct',botArray[steps]);
        steps++;
        if( steps >= botArray.length ){
            console.log(steps, 'step');
            playerTurn = 1;
            steps = 0;
            gameLoop();
            return;
        }
    }else{
        // console.log(steps, 'step');
        // console.log(`error array${steps} item${botArray[steps]} array${botArray}`);
        console.log(`index: ${index}, array: ${botArray[steps]}`);
        gameRun = false;
        steps = 0;
        gameLoop();
        return;
    }

    // for( steps = 0; steps < botArray.length;){
    //     console.log('inside for loop before if ', steps);
    //     if(index == botArray[steps]){
    //         console.log(steps);
    //         console.log('correct',botArray[steps]);
    //         steps++;
    //         if( steps >= botArray.length ){
    //             console.log(steps, 'step');
    //             playerTurn = 1;
    //             gameLoop();
    //             return;
    //         }
    //     }else{
    //         // console.log(steps, 'step');
    //         // console.log(`error array${steps} item${botArray[steps]} array${botArray}`);
    //         console.log(`index: ${index}, array: ${botArray[steps]}`);
    //         gameRun = false;
    //         gameLoop();
    //         return;
    //     }
    // }
    // console.log(index);
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
                    console.log('anim');
                    resolve();
                }, 500); 
            }, 800);
        });
    };
    console.log(botArray);
    playerTurn = 0;
    level++;
    gameLoop();
}

async function botArraysMove(){
    
}

document.addEventListener('keydown', gameLoop);

async function clickAnim(e){
    e.target.classList.add('click');
    await new Promise(resolve => {
        setTimeout(()=>{e.target.classList.remove('click')}, 500);
        resolve();
    });
}

function title(message) { diaLog.textContent = `${message}`;  };
