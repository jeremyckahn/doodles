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

    if (-1e-1 < decay && decay > 1e-2) {
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      return;
    }

    var b = 1 / decay;
    var dt = Math.PI / 4;
    var m = 8;

    if (Math.abs(b) > 1) {
      dt /= Math.abs(b);
    }

    if (b < 0) {
      dt *= -1;
    }

    var D = Math.sqrt(Math.pow(startX - endX, 2) Math.pow(startY - endY, 2))

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
  }());

} (this));
