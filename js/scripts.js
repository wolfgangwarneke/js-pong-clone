var canvas;
var canvasContext;
var firstBall;
var playerOne;
var mouse = { x: 0, y: 0 };
var prevMouse = { x: 0, y: 0};
function Ball(xPos, yPos, width, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVelocity = 1;
    this.yVelocity = 5;
    this.width = width;
    this.radius = function() { return this.width / 2 }
    this.color = color;
    this.draw = function() {
      colorCircle(this.xPos, this.yPos, this.radius(), this.color);
    };
    this.move = function() {
      this.xPos += this.xVelocity;
      this.yPos += this.yVelocity;
      if (firstBall.xPos > canvas.width + this.radius() || firstBall.xPos < 0 - this.radius()) {
        this.xVelocity *= -1;
        this.reset();
      }
      if (firstBall.yPos > canvas.height - this.radius() || firstBall.yPos < 0 + this.radius()) this.yVelocity *= -1;
    };
    this.reset = function() {
      this.xPos = canvas.width/2;
      this.yPos = canvas.height/2;
    }
}
function Player(color) {
    this.xPos = 0;
    this.yPos = 0;
    this.width = 20;
    this.height = 200;
    this.color = color;
    this.draw = function() {
      colorRect(this.xPos,this.yPos-this.height/2,this.width,this.height,this.color);
    };
    this.move = function(mouseYPos) {
      //console.log(mouse.y, prevMouse.y, this.yPos);
      // playerFloorY = Math.floor(this.yPos);
      // mouseFloorY = Math.floor(mouseYPos);
      var absDiff = Math.abs(this.yPos - mouseYPos);
      if (this.yPos !== mouseYPos) {
        if (this.yPos > mouseYPos) {
          this.yPos -= absDiff<8 ? absDiff/2 : 8;
        } else if (this.yPos < mouseYPos) {
          this.yPos += absDiff<8 ? absDiff/2 : 8;
        }
      }

    }
}

function setMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouse.x = evt.clientX - rect.left - root.scrollLeft;
  mouse.y = evt.clientY - rect.top - root.scrollTop;
}

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');
  firstBall = new Ball(50,50,20,"yellow");
  playerOne = new Player("orange");
  var framesPerSecond = 30;
  setInterval(update, 1000/framesPerSecond);
  canvas.addEventListener('mousemove',
    function(evt) {
      prevMouse = mouse;
      setMousePosition(evt);
    }
  );
}

function update() {
  moveEverything();
  drawEverything();
}

function moveEverything() {
  firstBall.move();
  playerOne.move(mouse.y);
}

function drawEverything() {
  colorRect(0,0,canvas.width,canvas.height,"blue");
  // canvasContext.fillStyle = "blue";
  // canvasContext.fillRect(0,0,canvas.width,canvas.height);
  firstBall.draw();
  playerOne.draw();
}


function colorRect(leftX, topY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX,topY,width,height);
}

function colorCircle(centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
