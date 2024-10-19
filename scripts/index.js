const boxes = document.querySelectorAll('.boxes');
function random(){
    return Math.floor(Math.random() * 4);
}

console.log(random());
let gameFlag = true;

const gameTime = 100; //ms
let botArray = [];

let givenArray = [0,1,2,3,0,1,2,3];

function main(){
    if(gameFlag){
        let miniFlag = botTurn();
        setTimeout(botSequence, 1000);
        gameFlag = miniFlag;
    }else{
        let miniFlag = playerTurn();
        // console.log('plager');
        if(!miniFlag){
            return;
        }
        gameFlag = miniFlag;
    }
}  

function botTurn() { 
    const AIno = random();
    // boxes[AIno].classList.add('click');
    // setTimeout(()=>{boxes[AIno].classList.remove('click')}, 500);
    botArray.push(AIno);
    mode = false;
    console.log(botArray, 'bot');

    return false;
}

function botSequence(){
    botArray.forEach((element, index)=>{
        setTimeout(() => {
            const oldColor = boxes[element].style.backgroundColor;

            boxes[element].classList.add('click');
            boxes[element].style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
            setTimeout(()=>{
                boxes[element].classList.remove('click');
                boxes[element].style.backgroundColor = oldColor;
            }, 500); 
        },index * 1000);
    });
}
function playerTurn() {
    boxes.forEach(box =>{
        box.addEventListener('click', (e) => {
            box.classList.add('click');
            box.classList.add('lightBg');
            for(let a = 0; a < botArray.length; a++){
                if(box.attributes[1].value == botArray[a]){
                    console.log('correct', a);
                }else{
                    return false;
                }
                
            }
            // console.log(, 'player');
        });
    });

    return true;
}
// givenArray.forEach((element, index)=>{
//     setTimeout(() => {
//         const oldColor = boxes[element].style.backgroundColor;

//         boxes[element].classList.add('click');
//         boxes[element].style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
//         setTimeout(()=>{
//             boxes[element].classList.remove('click');
//             boxes[element].style.backgroundColor = oldColor;
//         }, 500); 
//     },index * 1000);
// });


// boxes.forEach(box =>{
//     box.addEventListener('click', (e) => {
//         box.classList.add('click');
//         box.classList.add('lightBg');
//         botArray.push(box.attributes[1].value);
//         console.log(botArray);
//     });
// });

document.addEventListener('keydown', main);