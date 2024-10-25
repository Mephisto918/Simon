const box1 = document.querySelector('.boxes:nth-child(1)');
const box2 = document.querySelector('.boxes:nth-child(2)');
const box3 = document.querySelector('.boxes:nth-child(3)');
const box4 = document.querySelector('.boxes:nth-child(4)');

const body = document.querySelector('body');


function buttonState(state) { 
    if(state == true){
        boxes.forEach((box, index) =>{
            box.addEventListener('click', (e)=> playerInput(e, box, index));
            box.style.backgroundColor = 'red';
            console.log('added');
        });
    }else{
        boxes.forEach((box, index) =>{
            box.removeEventListener('click', (e)=> playerInput(e, box, index));
            box.style.backgroundColor = 'green';
            console.log('remove');
        });
    }
}

function turnIndicator(turn) {
    if(turn == 1){      
        body.style.backgroundImage = `linear-gradient(to bottom, black 70%, red)`;
    }else if(turn == 0){
        body.style.backgroundImage = `linear-gradient(to bottom, black 70%, green)`;
    }
}

async function clickAnim(e){
    e.target.classList.add('click');
    await new Promise(resolve => {
        setTimeout(()=>{e.target.classList.remove('click')}, 500);
        resolve();
    });
}

function title(message) { diaLog.textContent = `${message}`;  };
function title2(message) { diaLog2.textContent = `${message}`;  };

