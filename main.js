const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');
let img = null
let img1 = null

window.onload = function()
{
    img = new Image();
    img1 = new Image();
    img1.src = 'clown1.jpg'
    img.src = 'clown.png'
    ctx.font = "30px Arial";
    ctx.fillText("TO WIN GAME REACH 20", 420, 400);
  
   
}







const cursor = {
    x: 0,
    y: 0
};

class Ball {
    constructor(size) {
        this.size = size
        this.posx = Math.floor(Math.random() * (canvas.width - size));
        this.posy = Math.floor(Math.random() * (canvas.height - size));
    }

    spawn() {
        ctx.beginPath(); 
        ctx.arc(this.posx + this.size / 2, this.posy + this.size / 2, this.size / 2, 0, Math.PI * 2); 
        ctx.drawImage(img, this.posx, this.posy, this.size, this.size);
    }

    destroy() {
        ctx.clearRect(this.posx, this.posy, this.size, this.size);
    }

    isClicked(x, y) {
        return (x >= this.posx && x <= this.posx + this.size &&
                y >= this.posy && y <= this.posy + this.size);
    }
}

let ball = null;
let points = 0;
let time = 10;
let record = 0

function play() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Record: " + record, 1000, 25);
    canvas.style.cursor = 'crosshair';
    document.getElementById("start").style.display = "none";
    points = 0;
    time = 10;
    spawnBall();
    startTimer();
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMousemove);
}

function spawnBall() {
    ball = new Ball(Math.floor(Math.random() * (100 - 30 + 1)) + 30);
    ball.spawn();
}

function startTimer() {
    const timerInterval = setInterval(function () {
        time -= 0.01;
        updateTime();
        if (time <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 10);
}

function updateTime() {
    ctx.clearRect(0, 0, 150, 30);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Time: " + time.toFixed(2), 10, 25);
}




function endGame() {
    
    canvas.removeEventListener('click', handleClick);
    canvas.removeEventListener('mousemove', handleMousemove);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("Points: " + points, 10, 25);
    if(points > record) record = points
    ctx.font = "30px Arial";
    ctx.fillText("Record: " + record, 1000, 25);
    document.getElementById("start").style.display = "inline-block";
    ctx.font = "100px Arial bold";
    ctx.fillStyle = "DarkRed"; 
    ctx.fillText("@TIME END", 360, 400);
    ctx.drawImage(img1, 500, 400, 300,400);

}

function handleClick(evt) {
    cursor.x = evt.clientX - canvas.getBoundingClientRect().left;
    cursor.y = evt.clientY - canvas.getBoundingClientRect().top;

    if (ball && ball.isClicked(cursor.x, cursor.y)) {
        ball.destroy();
        points++;
        ctx.clearRect(580, 400 - 30, 100, 30);
        ctx.fillText(points, 580, 400);
        spawnBall();
    }
}

function handleMousemove(evt) {
    cursor.x = evt.clientX - canvas.getBoundingClientRect().left;
    cursor.y = evt.clientY - canvas.getBoundingClientRect().top;
}
