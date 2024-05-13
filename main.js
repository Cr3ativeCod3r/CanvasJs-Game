const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

const cursor = {
    x: 0,
    y: 0
};

class Ball {
    constructor(size) {
        this.size = size;
        this.posx = Math.floor(Math.random() * 1000);
        this.posy = Math.floor(Math.random() * 600);
    }

    spawn() {
        ctx.fillRect(this.posx, this.posy, this.size, this.size);
    }

    destroy() {
        ctx.clearRect(this.posx, this.posy, this.size, this.size);
    }
}

let ball = null;
let points = 0;
let time = 10;
let record = 0

function play() {
    document.getElementById("start").style.display = "none";
    points = 0;
    time = 10;
    spawnBall();
    startTimer();
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMousemove);
}

function spawnBall() {
    ball = new Ball(50);
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
    canvas.style.cursor = 'default';
    ctx.fillText("Points: " + points, 10, 25);
    if(points===record) ctx.fillText("NOOB - You will never brake "+record,500,300) 
    if(points>record) record=points
    ctx.fillText("Record: " + record, 1000, 25);
    document.getElementById("start").style.display = "inline-block";

}

function handleClick(evt) {
    cursor.x = evt.clientX - canvas.getBoundingClientRect().left;
    cursor.y = evt.clientY - canvas.getBoundingClientRect().top;

    if (ball && cursor.x >= ball.posx && cursor.x <= ball.posx + ball.size &&
        cursor.y >= ball.posy && cursor.y <= ball.posy + ball.size) {
        canvas.style.cursor = 'default';
        ball.destroy();
        points++;
        spawnBall();
    }
}

function handleMousemove(evt) {
    cursor.x = evt.clientX - canvas.getBoundingClientRect().left;
    cursor.y = evt.clientY - canvas.getBoundingClientRect().top;

    if (ball && cursor.x >= ball.posx && cursor.x <= ball.posx + ball.size &&
        cursor.y >= ball.posy && cursor.y <= ball.posy + ball.size) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
}
