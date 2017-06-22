// set the canvas to not repeat, background white
function setup() {
  createCanvas(displayWidth, displayHeight);
  console.log("Display Width:" + displayWidth);
  console.log("Display Height: " + displayHeight);
  noLoop();
  background(255);
}

// draw the mondrian!
function draw() {
  console.log("New draw function called.");
  strokeWeight(3);
  var r;

  var numVerticalLines = Math.floor(random(5)) + 6; // min: 6, max: 10
  var verticalLines = new Array(numVerticalLines + 1);
  for (var i = 0; i < numVerticalLines; i++) {
    if (i == 0) { r = random(displayWidth / 3); }
    else { r = random(displayWidth / 3) + verticalLines[i - 1] + 15; }
    verticalLines[i] = r;
    stroke(0);
    line(r, 0, r, height);
  }

  var numHorizontalLines = Math.floor(random(5)) + 4; // min: 4, max: 8
  var horizontalLines = new Array(numHorizontalLines + 1);
  for (var i = 0; i < numHorizontalLines; i++) {
    if (i == 0) { r = random(displayHeight / 3); }
    else { r = random(displayHeight / 3) + horizontalLines[i - 1] + 15; }
    horizontalLines[i] = r;
    stroke(0);
    line(0, r, width, r);
  }

  // a coordinate (x, y) is filled if the rectangle to its bottom right is
  // also filled.
  var indexFilled = new Array(numVerticalLines);
  for (var i = 0; i < numVerticalLines; i++) {
    indexFilled[i] = new Array(numHorizontalLines);
  }

  var trials = 0;
  while (trials < 15) {
    trials++;
    fillColor();  
    // rect syntax: start point (x, y) (length x, length y). calculate indexes
    var startX = Math.floor(random(numVerticalLines - 2));
    var startY = Math.floor(random(numHorizontalLines - 2));
    var endX = Math.floor(random(numVerticalLines - startX - 2)) + startX + 1;
    var endY = Math.floor(random(numHorizontalLines - startY - 2)) + startY + 1;
    console.log(startX);
    console.log(startY);
    console.log(endX);
    console.log(endY);

    var tempStartX = startX;
    var tempStartY = startY;

    // check if these indices are valid (whether or not they have already been filled)
    var filled = false;
    while (startX < endX) {
      startY = tempStartY;
      while (startY < endY) {
        if(indexFilled[startX][startY]) { 
          filled = true; 
        } // end if statement
        startY = startY + 1;
      } // end while start Y < end Y loop
      startX = startX + 1;
    } // end while start X < end X loop

    startX = tempStartX;
    startY = tempStartY;

    // if they haven't been filled, fill them and increase the count
    if (! filled) {
      rect(verticalLines[startX], horizontalLines[startY],
       verticalLines[endX] - verticalLines[startX], horizontalLines[endY] - horizontalLines[startY]);
      while (startX < endX) {
        startY = tempStartY;
        while (startY < endY) {
          indexFilled[startX][startY] = true;
          startY = startY + 1;
        } // end while startY < endY loop
        startX = startX + 1;
      } // end while startX < endX loop
    } // end if not filled statement
  } // end while numFilled < 3 block 
}

// fill the color red yellow or blue
function fillColor() {
  var randomColor = Math.floor(random(3));
  //console.log(randomColor);
  if (randomColor == 0) {
    fill('#ff0000'); // red
  } else if (randomColor == 1) {
    fill('#ffff00'); // yellow
  } else if (randomColor == 2) {
    fill('#0000ff'); // blue
  }
}

// reset the canvas if mouse is pressed
function mousePressed() {
  clear();
  redraw();
}