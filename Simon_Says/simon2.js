// 1. keyPress -> GameStart
// 2. Level 1 + flashButton
// gameSequence[] , userSequence[]
// 3. pressButton + checkSequence(gameSequence[] == userSequence[])
// 4. if yes --> Level 2
// if no --> exit

let btns = ["yellow","red","purple","green"];
let gameSeq = [];
let userSeq = [];
let started = false;
let levl = 0;
let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

// Object to hold sounds
const buttonSounds = {
    red: new Audio('red.mp3'),
    yellow: new Audio('yellow.mp3'),
    green: new Audio('green.mp3'),
    purple: new Audio('purple.mp3'),
    gameOver : new Audio('Game_Over.mp3'),
};

document.addEventListener("keypress",function(){
    if(started == false){
        started = true;
    }
    levelUp();
})

function levelUp(){
    userSeq = [];
    levl++;
    h2.innerText = `Level ${levl}`;

    // choose random button
    let rndmIdx = Math.floor(Math.random()*3);
    let rndmColor = btns[rndmIdx];
    let rndmBtn = document.querySelector(`.${rndmColor}`);
    gameSeq.push(rndmColor)
    console.log(gameSeq);
    gameFlash(rndmBtn);
}

function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");

    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

// Function to play sound
function playSound(color) {
    buttonSounds[color].play();
}

function check(idx){
    // let idx = levl-1;
    
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp(),1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b> ${levl} </b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = 'white';
            playSound(gameOver);
        },250);
        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    playSound(userColor);
    check(userSeq.length-1);


}

for(bttns of allBtns){
    bttns.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    levl = 0;
}



