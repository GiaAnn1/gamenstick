const board = document.querySelector("#board");
const ctx = board.getContext("2d");
const gameWidth = board.width;
const gameHeight = board.height;
const floorColor = "red";
const score = document.getElementById("score");
const lives = document.getElementById("lives");
var canvas = document.getElementById("board")

let extraLife = {
    x: gameWidth/6,
    y: gameHeight/3,
};

let play = {
    x: gameWidth/2 + 100,
    y: gameHeight/3,
};

let fallRate = 1500;
let speedRate = 0;
let rate = 100;
let obstacleState = 1;
let hitbox = {
    x: 50,
    y: gameHeight - 225,
    width: 200,
    height: 150,
};
let spriteInterval = 0;
let playerJump = false;
let playerSlash = false;
let currentPlayer = 2;

let gamestate = {
    menu: 1,
    game: 2,
};

let currentState = 1;

let spike = {
    x: gameWidth + 100,
    y: gameHeight - 200,
    height: 100,
    width: 50,
};

let wall = {
    x: gameWidth + 100,
    y: gameHeight - 500,
    height: 400,
    width: 20,
};

let doubleSpike = {
    x: gameWidth + 100,
    y: gameHeight - 200,
    height: 100,
    width: 100,
};

let spikeWall = {
    x: gameWidth + 10,
    y: 10,
    height: 100,
    width: 20,
    wallx: gameWidth + 100,
    wally: gameHeight - 350,
    spikecolor: "red",
};

let spriteMenu = {
    x: gameWidth/3 + 50,
    y: gameHeight/3,
};

let sword = {
    x: 180,
    y: hitbox.y + 20,
};

window.addEventListener("keydown", jump);
window.addEventListener("keydown", slash);

render();


function render(){
    setInterval(() => {
    switch(currentState){
        case gamestate.game:
            
        if(spriteInterval > 1){
            spriteInterval = 0;
        }
        else if(playerJump){
            spriteInterval = -1;
        }
        else
        {
            spriteInterval++
        };
        ctx.clearRect(0, 0, 3200, 800);
        drawFloor();
        drawPlayer();
        drawSpike();
        drawDoubleSpike();
        collision();
        drawWall();
        drawSword();
        returnMenu();
        obstacleControl();
        break;
        case gamestate.menu:
            ctx.clearRect(0, 0, 3200, 800);
            drawMenu(); break;
    }
}, rate);
};
function drawMenu(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 3200, 800);
    menuSprite();
};
function menuSprite(){
    var sprite = new Image();
    sprite.onload = function(){
        ctx.drawImage(sprite, spriteMenu.x, spriteMenu.y, 200, 150);
    }
    sprite.src = "stickmenu.png";
};

function playButton(){
    currentState = 2;
};
function extraLifer(){
    if(+score.textContent >= 500 && currentState == 1){
        score.textContent = +score.textContent - 500;
        lives.textContent= +lives.textContent + 1;
    }
};
function returnMenu(){
    setInterval(() =>{
    if(+lives.textContent == 0){
        lives.textContent = 1;
        currentState = gamestate.menu;
        console.log(currentState);
    }
}, 10)
};
function jump(event){
    const jumpKey = event.keyCode;
    if(jumpKey == 32 && playerJump == false){
        hitbox.y = hitbox.y - 150;
        playerJump = true;
        sword.y = sword.y - 180;
        fall();
    }
};
function fall(){
        setTimeout(() => {
            if(playerJump){
            hitbox.y = gameHeight - 225; 
            sword.y = hitbox.y + 20
            playerJump = false;
    }
    if(rate == 80){
        fallRate = 800;
    }
    if(rate == 70){
        fallRate = 700;
    }
    if(rate == 60){
        fallRate = 600;
    }
    else{
        fallRate = 1500;
    }
}, fallRate);
    
};
function drawPlayer(){
var playerSprite = new Image();
    playerSprite.onload = function(){
        ctx.drawImage(playerSprite, 800 + (800 * spriteInterval), 0, 800, 600, hitbox.x, hitbox.y, hitbox.width, hitbox.height);
}
   playerSprite.src = "spritesheet.png";
};
function drawExtraLife(){
    var lifeButton = new Image();
    lifeButton.onload = function(){
        ctx.drawImage(lifeButton, extraLife.x, extraLife.y, 200, 150);
    }
    lifeButton.src = "life.png";
};
function drawFloor(){
    ctx.fillStyle = floorColor;
    ctx.fillRect(0, gameHeight - 100, gameWidth, 100);
};
function drawSpike(){
    var spike1 = new Image();
    spike1.onload = function(){
        ctx.drawImage(spike1, spike.x, spike.y, spike.width, spike.height);
    }
    spike1.src = "spike1.png";
};
function drawWall(){
    ctx.fillStyle = "purple"
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
};
function drawDoubleSpike(){
    var doubleSpike1 = new Image();
    doubleSpike1.onload = function(){
        ctx.drawImage(doubleSpike1, doubleSpike.x, doubleSpike.y, doubleSpike.width, doubleSpike.height);
    }
    doubleSpike1.src = "doublespike.png";
};

function drawSword(){
    var sword1 = new Image();
    sword1.onload = function(){
        if(playerSlash){
        ctx.drawImage(sword1, sword.x, sword.y, 80, 60)
        }
    }
    sword1.src = "sword.png";
}

function slash(event){
    const slashKey = event.keyCode;
    if(slashKey == 70 && playerSlash == false){
        playerSlash = true;
        clearSword();
    }
};
function collision(){
    if(spike.x + 15 <= hitbox.x + 150 && (spike.x + spike.width) - 5 >= hitbox.x + 100 && playerJump == false){
        spike.x = gameWidth + 100;
        ctx.clearRect(0, 0, 3200, 800);
        var plusOrMinus0 = Math.random() < 0.5 ? -1 : 1;
            obstacleState = obstacleState + plusOrMinus0;
            lives.textContent = +lives.textContent - 1;
           
    }
    if(doubleSpike.x + 15 <= hitbox.x + 150 && (doubleSpike.x + doubleSpike.width) - 5 >= hitbox.x + 100 && playerJump == false){
        doubleSpike.x = gameWidth + 100;
        ctx.clearRect(0, 0, 3200, 800);
        var plusOrMinus0 = Math.random() < 0.5 ? -1 : 1;
            obstacleState = obstacleState + plusOrMinus0;
            lives.textContent = +lives.textContent - 1;
            
    }
    if(wall.x + 15 <= hitbox.x + 100 && playerSlash == false){
        wall.x = gameWidth + 100;
        ctx.clearRect(0, 0, 3200, 800);
        var plusOrMinus0 = Math.random() < 0.5 ? -1 : 1;
            obstacleState = obstacleState + plusOrMinus0;
            lives.textContent = +lives.textContent - 1;
        
    }
    if(sword.x + 80 >= wall.x && playerSlash == true){
        wall.x = gameWidth + 100;
        ctx.clearRect(0, 0, 3200, 800);
        var plusOrMinus0 = Math.random() < 0.5 ? -1 : 1;
        obstacleState = obstacleState + plusOrMinus0;
    }
    if(+lives.textContent == 0){
        ctx.clearRect(0,0, 3200, 800);
    }
};
function obstacleControl(){
    
    if(obstacleState > 2 || obstacleState < 0){
        obstacleState = 0;
    }
    if(+score.textContent > 100 && speedRate == 0){
        rate = 80;
        speedRate = 80;
        render();
    }
    if(+score.textContent > 300 && speedRate == 80){
        rate = 70;
        speedRate = 70;
        render();
    }
    if(+score.textContent >= 500 && speedRate == 70){
        rate = 60;
        speedRate = 60;
        render();
    }
    score.textContent = +score.textContent + 1;

    switch(obstacleState){
    case 0: spikeControl(); break;
    case 1: doubleSpikeControl(); break;
    case 2: wallControl(); break;
    }

};
function wallControl(){
    if(wall.x <= 0){
        wall.x = gameWidth + 100;
        var plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
        obstacleState = obstacleState + plusOrMinus2;
    }
    wall.x -= 20;
}
function doubleSpikeControl(){
    if(doubleSpike.x <= 0){
        doubleSpike.x = gameWidth + 100;
        var plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
        obstacleState = obstacleState + plusOrMinus1;
    }
    doubleSpike.x -= 20;

}

function spikeControl(){

        if(spike.x <= 0){
            spike.x = gameWidth + 100;
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            obstacleState = obstacleState + plusOrMinus;
        }
        spike.x -= 20;

}
function clearSword(){
    setTimeout(() => {
        ctx.clearRect(0, 0, 3200, 800);
        playerSlash = false;
    }, 1000);
}

