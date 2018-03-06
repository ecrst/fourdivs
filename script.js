(function() {
  'use strict';
}()); //USE strict

const boxes = (function() {
  let boxesArray = document.getElementsByClassName('content-box');
  let boxes = {}, i = 1;
  for (box of boxesArray) {
    boxes['box' + i++] = box;
  }
  return boxes;
}());

for (resizer of document.getElementsByClassName('resizer')) {

  resizer.addEventListener('mousedown', e => {
    e.preventDefault();
    let resizer = e.target
    if (resizer.classList.contains('vertical')) {
      document.body.style.cursor = 'e-resize';
    } else {
      document.body.style.cursor = 'n-resize';
    }

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', resize);
      document.body.style.cursor = 'auto';
    });

    function resize(e) {
      return resizer.classList.contains('vertical') ? resizeX(e) : resizeY(e)
      e.preventDefault();
    }
    function resizeX(e) {
      let bodyWidth = 100 / document.body.clientWidth;
      let leftHeight = (parseFloat(getComputedStyle(boxes.box1, '').width) + e.movementX) * bodyWidth;
      boxes.box1.style.width =  leftHeight + '%';
      boxes.box2.style.width =  (100 - leftHeight) + '%';
      boxes.box3.style.width =  (100 - leftHeight) + '%';
    }
    function resizeY(e) {
      let bodyHeight = 100 / document.body.clientHeight;
      let topHeight = (parseFloat(getComputedStyle(boxes.box2, '').height) + e.movementY) * bodyHeight;
      boxes.box2.style.height = topHeight + '%';
      boxes.box3.style.height = (100 - topHeight) + '%';
    }
  })
}
