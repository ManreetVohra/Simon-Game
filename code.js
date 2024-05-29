let gameSeq=[];
let userSeq=[];
let started= false;
let level=0;
let h2= document.querySelector("h2");
let btns=["yellow","red","green","purple"];
let highest=0; 
let h3=document.querySelector("h3");
h3.innerHTML=`Your highest score is <b>${highest}</b>.`;

document.addEventListener('keypress',function(){
    if(started==false)
    {
        // console.log("game has started");
        started=true;
        levelUp();
    }
})

function btnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function userPress()
{
    let btn=this;
    userFlash(btn);

    let usercolor=btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

function levelUp()
{
    userSeq=[];

    level++;
    h2.innerText = `Level ${level}` ;

    let ran = Math.floor(Math.random()*4);
    let randColor = btns[ran];
    let ranbtn=document.querySelector(`.${randColor}`);
    // console.log(ran);
    gameSeq.push(randColor);

    btnFlash(ranbtn);
}

function checkAns(idx)
{
    if(userSeq[idx]==gameSeq[idx])
    {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else
    {
        if(level>=highest)
        {
            highest=level;
            // console.log(highest);
            h3.innerHTML=`Your highest score is <b>${highest}</b>.`;
        }
        h2.innerHTML =`Game Over! Your score is <b>${level}</b>.<br>Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

let allBtns=document.querySelectorAll(".btn");

for(btn of allBtns)
{
    btn.addEventListener('click',userPress);
}

function reset()
{
    started = false;
    level = 0;
    gameSeq=[];
    userSeq=[];
}