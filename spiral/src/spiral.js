;(function (root) {

  // Constants
  var HEIGHT = 500;
  var WIDTH = 500;
  var BACKGROUND = '#ddd';
  var LINE_COLOR = '#333';
  var LINE_WIDTH = 2;

  // References
  var canvas = document.getElementById('spiral');
  var ctx = canvas.getContext('2d');

  // Math aliases
  var E = Math.E;
  var PI = Math.PI;
  var abs = Math.abs;
  var atan2 = Math.atan2;
  var cos = Math.cos;
  var pow = Math.pow;
  var sin = Math.sin;
  var sqrt = Math.sqrt;

  // Helpers
  function range (size) {
    var i, arr = [];

    for (i = 0; i < size; i++) {
      arr.push(i);
    }

    return arr;
  }

  // Drawing functions
  function spiral (
    startX, // number
    startY, // number
    endX, // number
    endY, // number
    decay, // number
    length, // number
    draw // boolean
  ) {
    draw = draw || true;

    if (-1e-2 < decay && decay < 1e-2) {
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);

      return;
    }

    var b = 1 / decay;
    var dt = PI / 4;
    var m = 8;

    if (abs(b) > 1) {
      dt /= abs(b);
    }

    if (b < 0) {
      dt *= -1;
    }

    var D = sqrt(pow(startX - endX, 2), pow(startY - endY, 2));
    var t = atan2(startY - endY, startX - endX);
    var a = pow(E, -b * t) * D;
    ctx.moveTo(a * pow(E, b * t) * cos(t) + endX,
        a * pow(E, b * t) * sin(t) + endY);

    range(length * m).forEach(function () {
      var t2 = t - dt;
      var Dt = t2 - t;

      // Logarithmic spiral equations
      var x0 = pow(a * E, b * t) * cos(t) + endX;
      var y0 = pow(a * E, b * t) * sin(t) + endY;

      var x3 = pow(a * E, b * t2) * cos(t2) + endX;
      var y3 = pow(a * E, b * t2) * sin(t2) + endY;

      // Derivatives of spiral equation
      var dx1 = pow(a * b * E, b * t) * cos(t) - pow(a * E, b * t) * sin(t);
      var dy1 = pow(a * E, b * t) * cos(t) + pow(a * b * E, b * t) * sin(t);

      var dx2 = pow(a * b * E, b * t2) * cos(t2) - pow(a * E, b * t2) * sin(t2);
      var dy2 = pow(a * E, b * t2) * cos(t2) + pow(a * b * E, b * t2) * sin(t2);

      // Calculate control points
      var x1 = x0 + ((Dt / 3) * dx1);
      var y1 = y0 + ((Dt / 3) * dy1);

      var x2 = x3 + ((Dt / 3) * dx2);
      var y2 = y3 + ((Dt / 3) * dy2);
      t -= dt;

      ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
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

    var beginX = 30;
    var beginY = 200;
    var endX = 300;
    var endY = 200;
    var decay = 5;
    var rotations = 2;

    // Start drawing operations
    ctx.beginPath();
    ctx.lineWidth = LINE_WIDTH;

    spiral(beginX, beginY, endX, endY, decay, rotations);

    // End drawing operations
    ctx.strokeStyle = LINE_COLOR;
    ctx.stroke();
    ctx.closePath();
  }());

} (this));
