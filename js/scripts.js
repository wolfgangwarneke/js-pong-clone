var canvas;
var canvasContext;
var firstBall;
var playerOne;
function Ball(xPos, yPos, width, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVelocity = 5;
    this.yVelocity = 5;
    this.width = width;
    this.color = color;
    this.draw = function() {
      canvasContext.fillStyle = this.color;
      canvasContext.fillRect(this.xPos,this.yPos,this.width,this.width);
    };
    this.move = function() {
      this.xPos += this.xVelocity;
      this.yPos += this.yVelocity;
      if (firstBall.xPos > 800 - this.width || firstBall.xPos < 0) this.xVelocity *= -1;
      if (firstBall.yPos > 600 - this.width || firstBall.yPos < 0) this.yVelocity *= -1;
    }
}
function Player(color) {
    this.xPos = 0;
    this.yPos = 0;
    this.width = 20;
    this.height = 200;
    this.color = color;
    this.draw = function() {
      canvasContext.fillStyle = this.color;
      canvasContext.fillRect(this.xPos,this.yPos,this.width,this.height);
    };
    this.move = function(x, y) {
      this.xPos += x;
      this.yPos += y;
    }
}

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');
  firstBall = new Ball(50,50,20,"yellow");
  playerOne = new Player("orange");
  var framesPerSecond = 30;
  setInterval(update, 1000/framesPerSecond);
}

function update() {
  moveEverything();
  drawEverything();
}

function moveEverything() {
  firstBall.move();
}

function drawEverything() {
  canvasContext.fillStyle = "blue";
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
  firstBall.draw();
  playerOne.draw();
}
