var canvas;
var canvasContext;

window.onload = function() {
  canvas = document.getElementById('canvas');
  canvasContext = canvas.getContext('2d');
  drawEverything();
}

function drawEverything() {
  canvasContext.fillStyle = "blue";
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
}
