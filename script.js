var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10; // радиус шарика;
var x = canvas.width / 2;  //позиция шарика по х
var y = canvas.height - 30; //позиция шарика по у
var dx = 2; //переменные скорости шарика
var dy = -2;  //переменные скорости шарика
var paddleHeight = 10;
var paddleWidth = 175;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 55;
var score = 0;

var bricksColor = '#0095DD';
var paddleColor = '#0095DD';
var ballColor = '#0095DD';
// var bricksColor = localStorage.getItem("bricksColor");
// var paddleColor = localStorage.getItem("paddleColor");
// var ballColor = localStorage.getItem("ballColor");

var redButton = document.getElementById('redBlock');
var blueButton = document.getElementById('blueBlock');
var greenButton = document.getElementById('greenBlock');
var startBtn = document.getElementById('start');

var redButton1 = document.getElementById('redBall');
var blueButton1 = document.getElementById('blueBall');
var greenButton1 = document.getElementById('greenBall');

var redButton2 = document.getElementById('redPaddle');
var blueButton2 = document.getElementById('bluePaddle');
var greenButton2 = document.getElementById('greenPaddle');

function goToRedBlock() {
    bricksColor = 'red';
}
function goToBlueBlock() {
    bricksColor = 'blue';
}
function goToGreenBlock() {
    bricksColor = 'green';
}

function goToRedBall() {
    ballColor = 'red';
}
function goToBlueBall() {
    ballColor = 'blue';
}
function goToGreenBall() {
    ballColor = 'green';
}

function goToRedPaddle() {
    paddleColor = 'red';
}
function goToBluePaddle() {
    paddleColor = 'blue';
}
function goToGreenPaddle() {
    paddleColor = 'green';
}

function myFunc3() {
    if (bricksColor == '#0095DD') {
        bricksColor = 'red';
    } else if (bricksColor == 'red'){
        bricksColor = 'green';
    } else {
        bricksColor = '#0095DD'
    }
}
startBtn.addEventListener('click', startGame);
redButton.addEventListener('click', goToRedBlock);
blueButton.addEventListener('click', goToBlueBlock);
greenButton.addEventListener('click', goToGreenBlock);

redButton1.addEventListener('click', goToRedBall);
blueButton1.addEventListener('click', goToBlueBall);
greenButton1.addEventListener('click', goToGreenBall);

redButton2.addEventListener('click', goToRedPaddle);
blueButton2.addEventListener('click', goToBluePaddle);
greenButton2.addEventListener('click', goToGreenPaddle);

document.addEventListener("keydown", keyDownHandler, false); //нажатие клавиши
document.addEventListener("keyup", keyUpHandler, false); //отпускание клавиши
document.addEventListener("mousemove", mouseMoveHandler, false);

var bricks = []; //условие создание кирпичиков
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for ( r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

//подключение  клавиш
function keyDownHandler(e) {
    if(e.keyCode == 39) { rightPressed = true } //стрелочка вправо
    else if(e.keyCode == 37) { leftPressed = true } //стрелочка влево
}
function keyUpHandler(e) {
    if(e.keyCode == 39) { rightPressed = false }
    else if(e.keyCode == 37) { leftPressed = false }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI * 2);
        ctx.fillStyle = ballColor;
        ctx.fill();
    ctx.closePath();    
}

function drawPaddle() {
    ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = paddleColor;
        ctx.fill();
    ctx.closePath();    
  
}
function youwin() {
    ctx.font = "60px Times New Roman";
    ctx.fillStyle = "#f24343";
    ctx.strokeStyle = "#d63939";
    ctx.fillText("YOU WIN!", canvas.width/4, canvas.height/2);
    ctx.strokeText("YOU WIN!", canvas.width/4, canvas.height/2);
}

function gameover() {
    // ctx.font = "60px Times New Roman";
    // ctx.fillStyle = "#f24343";
    // ctx.strokeStyle="#d63939";
    ctx.fillText = ("GAME OVER", canvas.width/4, canvas.height/2);
    // ctx.strokeText("GAME OVER", canvas.width/4, canvas.height/2)
}

function drawBricks() {
    for (c=0; c<brickColumnCount; c++) {
        for (r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = bricksColor;
                    ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function collision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }
            }
        }
    }
}




function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collision();
    drawScore();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx }
    if (y + dy < ballRadius) { dy = -dy } 
    else if ( y + dy > canvas.height-ballRadius ) {
    if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
    } else {
        gameover();
        function delay() { document.location.reload(); }
        setTimeout(delay, 3000);
    }
}
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
}
    else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
}
if(score == brickRowCount * brickColumnCount) {
    youwin();
    function delay() { document.location.reload(); }
    setTimeout(delay, 6000);
}
    x += dx;
    y += dy;
}

function startGame() {
    setInterval(draw, 10);
}