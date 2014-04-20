/* global requirejs:true */
requirejs.config({
  baseUrl: './'
  ,paths: {
    shifty: '../bower_components/shifty/dist/shifty'
  }
});

requirejs([

  'shifty'

], function (

  Tweenable

) {
  'use strict';

  function getComputed (el) {
    return window.getComputedStyle(el);
  }

  function Cut (container) {
    var canvas = document.createElement('canvas');
    canvas.height = parseInt(getComputed(container).height, 10);
    canvas.width = parseInt(getComputed(container).width, 10);

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 100;
    this.y2 = 100;

    this.context = canvas.getContext('2d');
    this.context.strokeStyle = '#fff';
    this.context.moveTo(this.x1, this.y1);
    this.context.lineTo(this.x2, this.y2);
    this.context.stroke();

    container.appendChild(canvas);
  }

  var container = document.querySelector('#cuts');
  new Cut(container);
});
