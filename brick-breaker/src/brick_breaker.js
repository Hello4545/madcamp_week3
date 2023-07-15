class Paddle {
    constructor() {
        this.image = new Image();
        this.image.src = "/assets/brick_paddle.png";
        this.width = 100;
        this.height = 20;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = 10;
    }
    draw() {
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    updatePosition(mouseX) {
        this.x = mouseX - this.width / 2;
    }
}
class Ball {
    constructor() {
        this.image = new Image();
        this.image.src = "/assets/brick_ball.png";
        this.radius = 10;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speed = 5;
        this.xspeed = 5;
        this.yspeed = 5;
    }
    draw() {
        // ctx.fillStyle = "blue";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        // ctx.fill();
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            2 * this.radius,
            2 * this.radius
        );
    }
    move(xspeed, yspeed) {
        this.x += xspeed;
        this.y += yspeed;
    }
}
class Brick {
    constructor(x, y) {
        this.image = new Image();
        this.image.src = "/assets/brick_brick.png";
        this.x = x;
        this.y = y;
        this.width = 78;
        this.height = 18;
        this.broken = false;
    }
    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function checkCrashPaddle(ball, paddle) {
    var rst = { dx: 1, dy: 1 };
    var inXCoordinate = ball.x >= paddle.x && ball.x <= paddle.x + paddle.width;
    var inYCoordinate =
        ball.y >= paddle.y && ball.y <= paddle.y + paddle.height;

    if (
        inXCoordinate &&
        ball.y + ball.radius >= paddle.y &&
        ball.y - ball.radius <= paddle.y + paddle.height
    ) {
        rst.dy = -1;
        return rst;
    }
    if (
        inYCoordinate &&
        ball.x + ball.radius >= paddle.x &&
        ball.x - ball.radius <= paddle.x + paddle.width
    ) {
        rst.dx = -1;
        return rst;
    }
    return rst;
}

function checkCrashBrick(ball, brick) {
    var rst = { dx: 1, dy: 1 };
    var inXCoordinate =
        brick.x <= ball.x + ball.radius &&
        ball.x - ball.radius <= brick.x + brick.width;
    var inYCoordinate =
        brick.y <= ball.y + ball.radius &&
        ball.y - ball.radius <= brick.y + brick.height;

    if (
        inXCoordinate &&
        ball.y + ball.radius >= brick.y &&
        ball.y - ball.radius <= brick.y + brick.height
    ) {
        rst.dy = -1;
        // return rst;
    }
    if (
        inYCoordinate &&
        ball.x + ball.radius >= brick.x &&
        ball.x - ball.radius <= brick.x + brick.width
    ) {
        rst.dx = -1;
        // return rst;
    }
    return rst;
}

function removeBrick(bricks, b) {
    bricks.forEach((a, i, o) => {
        if (a.x == b.x && a.y == b.y) {
            o.splice(i, 1);
        }
    });
}

function eachframe() {
    if (ball.y + ball.radius > canvas.height) {
        gameStarted = false;
        // startButton.style.display = "block";
        return;
    }
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        xspeed *= -1;
    }
    if (ball.y - ball.radius < 0) {
        yspeed *= -1;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < bricks.length; i++) {
        var rst = checkCrashBrick(ball, bricks[i]);
        if (rst.dx == -1 || rst.dy == -1) {
            removeBrick(bricks, bricks[i]);
        }
        xspeed *= rst.dx;
        yspeed *= rst.dy;
    }
    bricks.forEach((a) => {
        a.draw();
    });

    var rst = checkCrashPaddle(ball, paddle);
    xspeed *= rst.dx;
    yspeed *= rst.dy;
    ball.move(xspeed, yspeed);

    ball.draw();
    paddle.draw();

    animation = requestAnimationFrame(eachframe);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

var paddle = new Paddle();
var ball = new Ball();
var bricks = [];

var xspeed = 5;
var yspeed = -10;

var gameStarted = false;

for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 5; j++) {
        var brick = new Brick(80 * i, 20 * j);
        bricks.push(brick);
    }
}
canvas.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX - canvas.offsetLeft;
    paddle.updatePosition(mouseX);
});

// window.onload = function () {
//     function draw() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         bricks.forEach((a) => {
//             a.draw();
//         });
//         ball.draw();
//         paddle.draw();
//     }

//     function update() {
//         ball.move(xspeed, yspeed);
//     }

//     function gameLoop() {
//         draw();
//         update();
//         requestAnimationFrame(gameLoop);
//     }

//     gameLoop();
//     eachframe();
// };

// window.onload = eachframe;

eachframe();
