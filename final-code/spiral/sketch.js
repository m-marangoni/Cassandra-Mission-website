var angle = 0;
var xCoord, yCoord;
var rad = 180;
var theta = -2;
var sourceText = "There will come soft rains and the smell of the ground,  And swallows circling with their shimmering sound; And frogs in the pools singing at night,And wild plum trees in tremulous white, Robins will wear their feathery fire Whistling their whims on a low fence-wire; And not one will know of the war, not one Will care at last when it is done. Not one would mind, neither bird nor tree If mankind perished utterly; And Spring herself, when she woke at dawn, Would scarcely know that we were gone.";
var curIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);


}

function draw() {
  fill(0);
  // x =  rad * sin(theta)
  // y = rad * cos(theta)
  push();
  translate(windowWidth / 2, windowHeight / 2);
  xCoord = rad * cos(theta);
  yCoord = rad * sin(theta);
  textSize(14);
  stroke(1)
  text(
    sourceText.substring(curIndex, curIndex + 1),
    xCoord, yCoord);
  rotate((windowWidth / 2, windowHeight / 2));
  textAlign(CENTER);

  //noise(angle) * 2;
  curIndex++;
  if (curIndex > sourceText.length) {
    pop();
  }

  theta += 0.08;
  rad -= 0.2;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}