(function() {
  'use strict';
}()); //USE strict

const props = (function() {
  let boxes = document.getElementsByClassName('wrapper-box');
  return {
    boxes: {
      box1: boxes[0],
      box2: boxes[1],
      box3: boxes[2],
      box4: boxes[3],
    },
    borderWidth: parseInt(getComputedStyle(boxes[0])
    .getPropertyValue('border-right-width'), 10) * 2,
  }
}());


document.addEventListener('mousedown', (e) => {
  e.preventDefault();
  if (!isBorder(e.target)) return;
  let currentCoords = {
    x: e.x,
    y: e.y,
  }
  let boxes = getBoxes(currentCoords.x, currentCoords.y, props.borderWidth);
  if (!boxes) return;

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', (e) => {
    document.removeEventListener('mousemove', resize)
  })

  function resize(e) {
    return boxes.hasOwnProperty('box1') ? resizeVert(e) : resizeHor(e)
  }
  function resizeVert(e) {
    console.log('kek');
    let change = currentCoords.x - e.x;
    currentCoords.x = e.x;
    boxes.box2.style.width = (parseInt(getComputedStyle(boxes.box2, '').width) + change) + 'px';
    boxes.box4.style.width = (parseInt(getComputedStyle(boxes.box4, '').width) + change) + 'px';
    boxes.box1.style.width = (parseInt(getComputedStyle(boxes.box1, '').width) - change) + 'px';
    boxes.box3.style.width = (parseInt(getComputedStyle(boxes.box3, '').width) - change) + 'px';
  }
  function resizeHor(e) {
    console.log('keks');
    let change = currentCoords.y - e.y;
    currentCoords.y = e.y;
    boxes.top.style.height = (parseInt(getComputedStyle(boxes.top, '').height) - change) + 'px';
    boxes.bot.style.height = (parseInt(getComputedStyle(boxes.bot, '').height) + change) + 'px';
  }

  function isBorder(el) {
    return el.classList.contains('wrapper-box')
  }
})

/**
* Is clicked element a border
* @param {Object} el - The element.
* @returns {boolean} - True if object is a wrapper (border) or false if it's not.
*/


/**
* Get paricipating boxes which are involved to resize
* @param {integer} x - X coordinates
* @param {integer} y - Y coordinates
* @param {integer} borderWidth - The width of box's border
* @returns {null||Object||Object}
*/
const getBoxes = (x, y, borderWidth) => {
  // [top, low, left, right] elements.
  let els = [[x, y - borderWidth], [x, y + borderWidth],
            [x - borderWidth, y], [x + borderWidth, y]]
            .map(convertCoordinatesToElemets)

  if (els.every(b => b == null || b.classList.contains('wrapper-box'))) return null;

  return (isNullOrWrapper(els[0]) && isNullOrWrapper(els[1])) ? props.boxes :
           {
             top: props.boxes['box'+els[0].id.slice(-1)],
             bot: props.boxes['box'+els[1].id.slice(-1)],
           }


  function isNullOrWrapper(el) {
    return el === null || el.classList.contains('wrapper-box')
  }
  function convertCoordinatesToElemets(c) {
    let el = document.elementFromPoint(c[0], c[1]);
    if (el === null) {
      return null;
    } else if (el.classList.contains('header')) {
      return el.parentElement;
    } else {
      return el;
    }
  }
}
