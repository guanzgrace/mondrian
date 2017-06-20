// set the canvas to not repeat, background white
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  background(255);
}

// draw the mondrian!
function draw() {
  strokeWeight(5);

  var numVerticalLines = random(4, 7);
  var verticalLines = [0,0,0,0,0,0,0];
  for (var i = 0; i < numVerticalLines; i++) {
    var r = random(windowWidth);
    verticalLines[i] = r;
    stroke(0);
    line(r, 0, r, height);
  }

  var numHorizontalLines = random(2, 5);
  var horizontalLines = [0,0,0,0,0];
  for (var i = 0; i < numHorizontalLines; i++) {
    var r = random(windowHeight);
    horizontalLines[i] = r;
    stroke(0);
    line(0, r, width, r);
  }

  fillColor();  
  rect(verticalLines[0], horizontalLines[0], verticalLines[1], horizontalLines[1]);
  fillColor();
  rect(verticalLines[2], horizontalLines[2], verticalLines[3], horizontalLines[3]);
}

// fill the color red yellow or blue
function fillColor() {
  var randomColor = random(1, 4);
  if (randomColor > 3) {
    fill('#ff0000'); // red
  } else if (randomColor > 2) {
    fill('#ffff00'); // yellow
  } else if (randomColor > 1) {
    fill('#0000ff'); // blue
  }
}

// reset the canvas if mouse is pressed
function mousePressed() {
  clear();
  redraw();
}