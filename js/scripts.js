var canvas;
var canvasContext;
var firstBall;
var playerOne;
var mouse = { x: 0, y: 0 };
var prevMouse = { x: 0, y: 0};

var playerScore = 0;
var opponentScore = 0;
var winning;
const WIN_CONDITION = 5;

var playingGame = true;

function Ball(xPos, yPos, width, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xVelocity = 10;
    this.yVelocity = 10;
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
        if (this.xVelocity > 0) {
          playerScore ++;
        } else {
          opponentScore ++;
        }
        this.xVelocity *= -1;
        this.reset();
      }
      if (firstBall.yPos > canvas.height - this.radius() || firstBall.yPos < 0 + this.radius()) this.yVelocity *= -1;
    };
    this.reset = function() {
      this.xPos = canvas.width/2;
      this.yPos = Math.floor(Math.random() * (canvas.height - this.width) + this.width);
      this.yVelocity = Math.floor(Math.random() * 10 + 1)
      if(playerScore >= WIN_CONDITION || opponentScore >= WIN_CONDITION) {
        winning = playerScore > opponentScore ? true: false;
        playingGame = false;
      }
    }
}
function Player(color) {
    this.xPos = 0;
    this.yPos = 0;
    this.width = 20;
    this.height = 100;
    this.color = color;
    this.draw = function() {
      colorRect(this.xPos,this.yPos-this.height/2,this.width,this.height,this.color);
    };
    this.move = function(mouseYPos) {
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

function clickContinue(evt) {
  if(!playingGame) {
    playerScore = 0;
    opponentScore = 0;
    playingGame = true;
  }
}

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');
  firstBall = new Ball(50,50,20,"yellow");
  playerOne = new Player("orange");
  opponentOne = new Player("red");
  opponentOne.xPos = canvas.width - opponentOne.width;
  var framesPerSecond = 30;
  setInterval(update, 1000/framesPerSecond);

  canvas.addEventListener('mousedown', clickContinue);

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
  if (!playingGame) {
    return;
  }
  firstBall.move();
  playerOne.move(mouse.y);
  computerMovement(opponentOne, firstBall);
  paddleCheck(playerOne, firstBall);
  paddleCheck(opponentOne, firstBall, "right");
}

function drawEverything() {
  if (!playingGame) {
    canvasContext.fillStyle = "#fcc";
    var message = winning ? "Hey looks like you won!" : "The computer guy one I guess"
    canvasContext.fillText(message, 100, 100);
    canvasContext.fillText("Click to continue", canvas.width/2, canvas.height/2);
    return;
  };
  drawMap();
  firstBall.draw();
  playerOne.draw();
  opponentOne.draw();
  canvasContext.fillText("Player score: " + playerScore, 100, 30);
  canvasContext.fillText("Opponent score: " + opponentScore, canvas.width - 200, 30);
}

function paddleCheck(player, ball, playerScreenSide) {
  var offset = player.width/2;
  if(playerScreenSide === "right") offset *= -1;
  if (player.xPos + offset === Math.abs(ball.xPos - ball.radius()) && player.yPos - player.height/2 < ball.yPos && player.yPos + player.height/2 > ball.yPos) {
    ball.xVelocity *= -1;
    var deltaY = ball.yPos - (player.yPos);
    ball.yVelocity = deltaY * 0.35;
  }
}

function computerMovement(computerPlayer, ball) {
  if(computerPlayer.yPos < ball.yPos - 35) {
    computerPlayer.yPos += 6;
  } else if (computerPlayer.yPos > ball.yPos + 35) {
    computerPlayer.yPos -= 6;
  }
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

function drawMap() {
  colorRect(0,0,canvas.width,canvas.height,"blue");
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width/2 -1, i, 2, 20, "navy");
  }
}
