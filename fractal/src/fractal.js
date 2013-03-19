;(function (root) {

  // Constants
  var HEIGHT = 500;
  var WIDTH = 500;
  var BACKGROUND = '#ddd';
  var LINE_COLOR = '#333';
  var LINE_WIDTH = 2;

  // References
  var canvas = document.getElementById('fractal');
  var ctx = canvas.getContext('2d');

  // Helpers
  function range (size) {
    var i, arr = [];

    for (i = 0; i < size; i++) {
      arr.push(i);
    }

    return arr;
  }

  function radiansFromDegree (degree) {
    return (degree / 180) * Math.PI;
  }

  function drawLine (x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = LINE_WIDTH;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = LINE_COLOR;
    ctx.stroke();
    ctx.closePath();
  }

  function drawKinkedLine (
      originX, // number
      originY, // number
      originAngle, // number
      curveLength, // number
      numKinks, // number
      kinkAngle // number
      ) {

    var lastX = originX;
    var lastY = originY;
    var lastAngle = radiansFromDegree(-originAngle - kinkAngle);

    range(numKinks).forEach(function (unused, i) {
      var lineLength = curveLength / (i + 1);
      var angle = lastAngle + radiansFromDegree(kinkAngle);
      var x = lastX + lineLength * Math.sin(angle);
      var y = lastY + lineLength * Math.cos(angle);

      drawLine(lastX, lastY, x, y);

      lastX = x;
      lastY = y;
      lastAngle = angle;
    });

  }


  // Setup
  canvas.height = HEIGHT;
  canvas.style.height = HEIGHT + 'px';
  canvas.width = WIDTH;
  canvas.style.width = WIDTH + 'px';
  canvas.style.background = BACKGROUND;

  // Animation loop
  (function update() {
    webkitRequestAnimationFrame(update);

    // Clear the canvas
    canvas.width = canvas.width;

    drawKinkedLine(
        0, // originX
        0, // originY
        -70, // originAngle
        300, // curveLength
        50, // numKinks
        -25 // kinkAngle
      );
  }());

} (this));
