const cvs = document.getElementById("snake");
const ctx = cvs.getContext('2d');

const box = 32;

//ground image
const groundImg = new Image();
groundImg.src = "/img/ground.png";

//food image
const foodImg = new Image();
foodImg.src = "img/food.png";

//load audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

//assign audio
dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"

//snake starting position
let snake = [];
snake[0] = { x: 9*box, y: 10*box }

//food starting position
let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
}

let score = 0;

//control the snake
document.addEventListener("keydown",direction);

let d;
function direction() {
    if(event.keyCode === 37 && d!=="RIGHT"){
        d="LEFT";
        left.play();
    } else if(event.keyCode === 38 && d!=="DOWN"){
        d="UP";
        up.play();
    } else if(event.keyCode === 39 && d!=="LEFT"){
        d="RIGHT";
        right.play();
    } else if(event.keyCode === 40 && d!=="UP"){
        d="DOWN";
        down.play();
    }
}

//check collision
function colision(head, array) {
    for (let i = 0; i<snake.length; i++) {
        if(head.x === snake[i].x && head.y === snake[i].y){
            return true;
        }
    }
    return false;
}

//drawing on canvas
function draw () {
    //draw ground
    ctx.drawImage(groundImg,0,0);

    //draw snake
    for (let i = 0; i<snake.length; i++){
        ctx.fillStyle = (i===0)? "green":"white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    //draw food
    ctx.drawImage(foodImg, food.x, food.y);

    //old head
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //direction to move
    if(d==="LEFT") snakeX -= box;
    if(d==="UP") snakeY -= box;
    if(d==="RIGHT") snakeX += box;
    if(d==="DOWN") snakeY += box;

    //snake eats the food
    if(snakeX === food.x && snakeY === food.y){
        score ++;
        eat.play();
        food = {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        }
    } else {
        //remove the tail
        snake.pop();
    }

    //add a new head
    let newHead = { x:snakeX,y:snakeY }

    //game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box 
        || snakeY > 17*box || colision(newHead, snake)){
        clearInterval(game);
        dead.play();
    }

    

    snake.unshift(newHead);

    //draw score
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);

}

let game = setInterval(draw,100);


