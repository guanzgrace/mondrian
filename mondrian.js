// set the canvas to not repeat, background white
function setup() {
  createCanvas(displayWidth, displayHeight);
  console.log("DisplayWidth:" + displayWidth);
  console.log("DisplayHeight: " + displayHeight);
  noLoop();
  background(255);
}

// draw the mondrian!
function draw() {
  strokeWeight(5);
  var r;

  var numVerticalLines = Math.floor(random(3)) + 4; // min: 4, max: 6
  var verticalLines = [0,0,0,0,0,0,0];
  for (var i = 0; i < numVerticalLines; i++) {
    if (i == 0) { r = random(displayWidth / 3); }
    else { r = random(displayWidth / 3) + verticalLines[i - 1] + 15; }
    verticalLines[i] = r;
    stroke(0);
    line(r, 0, r, height);
  }

  var numHorizontalLines = Math.floor(random(3)) + 2; // min: 2, max: 4
  var horizontalLines = [0,0,0,0,0];
  for (var i = 0; i < numHorizontalLines; i++) {
    if (i == 0) { r = random(displayHeight / 3); }
    else { r = random(displayHeight / 3) + horizontalLines[i - 1] + 15; }
    horizontalLines[i] = r;
    stroke(0);
    line(0, r, width, r);
  }

  var vFilled = [false, false, false, false, false, false, false];
  var hFilled = [false, false, false, false,false];
  var numFilled = 0;
  while (numFilled < 1) {
    fillColor();  
    // rect syntax: start point (x, y) (length x, length y).
    // calculate indexes
    var startX = Math.floor(random(numVerticalLines - 1));
    var startY = Math.floor(random(numHorizontalLines - 1));
    var endX = Math.floor(random(numVerticalLines - startX) + numVerticalLines - 1);
    var endY = Math.floor(random(numHorizontalLines - startY) + numHorizontalLines - 1);
    console.log(startX);
    console.log(startY);
    console.log(endX);
    console.log(endY);

    var tempEndX = endX;
    var tempEndY = endY;

    var filled = false;
    while (tempEndX > startX) {
      if(vFilled[tempEndX]) { filled = true; }
      tempEndX = tempEndX - 1;
    }
    while (tempEndY > startY) {
      if(hFilled[tempEndY]) { filled = true; }
      tempEndY = tempEndY - 1;
    }

    if (! filled) {
      rect(verticalLines[startX], horizontalLines[startY],
       verticalLines[endX] - verticalLines[startX], horizontalLines[endY] - horizontalLines[startY]);
      while (endX > startX) {
        vFilled[endX] = true;
        endX = endX - 1;
      }
      while (endY > startY) {
        hFilled[endY] = true;
        endY = endY - 1;
      }
      numFilled++;
      console.log(vFilled);
      console.log(hFilled);
    } // end if not filled statement

  } // end while numFilled < 3 block 
}

// fill the color red yellow or blue
function fillColor() {
  var randomColor = random(3);
  //console.log(randomColor);
  if (randomColor < 1) {
    fill('#ff0000'); // red
  } else if (randomColor < 2) {
    fill('#ffff00'); // yellow
  } else if (randomColor < 3) {
    fill('#0000ff'); // blue
  }
}

// reset the canvas if mouse is pressed
function mousePressed() {
  clear();
  redraw();
}