const boxes =document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newgame=document.querySelector(".btn");

//variables requaired
let currentplayer;
let gamegrid;

const winningpositions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//function to initialize the game 
function initgame(){
    currentplayer="X";
    gamegrid =["","","","","","","","",""];
    //making ui empty 
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
        })
    //swap turns
    newgame.classList.remove('active');
    gameInfo.innerText= `Current Player - ${currentplayer}`;
    boxes.forEach((box,index)=>{
        box.classList.remove("win");
        })
}

initgame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{handleclick(index);})


})

function handleclick(index){
    if(gamegrid[index] === ""){
        boxes[index].innerText=currentplayer;
        gamegrid[index]=currentplayer;
        boxes[index].style.pointerEvents="none";
        //swap turns
        swapTurns();

        //chrck for gameover
        checkgameover();

    }
}

function swapTurns(){
    if (currentplayer === 'X'){
        currentplayer="O";
    } 
    else{
        currentplayer="X";
    }
    gameInfo.innerText= `Current Player - ${currentplayer}`;
}

function checkgameover(){
    let answer="";
    winningpositions.forEach((position) => {
        if(gamegrid[position[0]] != "" && 
        gamegrid[position[1]] != "" && 
        gamegrid[position[2]] != "" && 
        gamegrid[position[0]] === gamegrid[position[1]] &&
        gamegrid[position[1]] === gamegrid[position[2]]){
            // chck if winner is x or 0
            if(gamegrid[position[0]] ==='X')
            answer='X';
            else
            answer='O';

            boxes.forEach((box) => {
                box.style.pointerEvents="none";
            })
            //now render the result in the tab 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }   

    });
    //we have a winner
    if(answer !==""){
        gameInfo.innerText=`Winner - ${answer}`;
        newgame.classList.add('active');
       
        return;
    }


    //in case of no winner 
    let fillcount=0;
    gamegrid.forEach((box)=>{
        if(box !== "")
        fillcount++;
    });
    if(fillcount === 9){
        gameInfo.innerText="Draw";
        newgame.classList.add('active');
        boxes.forEach(box.style.pointerEvents="none");
        return;
    }
}

newgame.addEventListener("click",initgame)