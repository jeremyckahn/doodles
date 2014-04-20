/* global requirejs:true */
requirejs.config({
  baseUrl: './'
  ,paths: {
    shifty: '../bower_components/shifty/dist/shifty'
    ,underscore: '../bower_components/underscore/underscore'
  }
});

requirejs([

  'shifty'
  ,'underscore'

], function (

  Tweenable
  ,_

) {
  'use strict';

  function getComputed (el) {
    return window.getComputedStyle(el);
  }

  function Cut (container) {
    var canvas = document.createElement('canvas');
    canvas.height = parseInt(getComputed(container).height, 10);
    canvas.width = parseInt(getComputed(container).width, 10);

    this.x1 = _.random(0, canvas.width);
    this.y1 = _.random(0, canvas.height);
    this.x2 = _.random(0, canvas.width);
    this.y2 = _.random(0, canvas.height);

    this.context = canvas.getContext('2d');
    this.context.lineWidth = 3;
    this.context.strokeStyle =
        'rgb('+_.random(128,255)+
          ', '+_.random(128,255)+
          ', '+_.random(128,255)+')';

    this.context.moveTo(this.x1, this.y1);
    this.context.lineTo(this.x2, this.y2);
    this.context.stroke();

    container.appendChild(canvas);

    return this;
  }

  var container = document.querySelector('#cuts');
  var cuts = [];

  var i = 0;
  for (i; i < 10; i++) {
    cuts.push(new Cut(container));
  }
});
