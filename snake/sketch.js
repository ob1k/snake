var s;
var scl = 20;

var food;
var img;
var song;
var button;
function preload(){
  img = loadImage('image/obface.png');
  song = loadSound("tune.mp3");
  button= createButton("play music");
  button.mousePressed(togglePlaying);
  
}

function setup() {
  createCanvas(500,400);
  s = new Snake();
  frameRate(12);
  pickLocation();

}

function togglePlaying(){
  if (!song.isPlaying()){
  song.loop();
    song.setVolume(0.3);
    button.html("pause music");
  } else {
    song.pause();
    button.html("play music");
    
  }
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random (rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();
  noStroke();
  fill(255, 0, 100, 150);
  ellipse(food.x, food.y, scl, scl);
}
  
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);  
  }
}
  
function Snake() {
  this.x = 0;
  this.y =0;
  this.xspeed = 1;
  this.yspeed = 0;
  
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }
  
  this.show = function() {
    fill(255, 0, 200, 150);
    imageMode(CENTER);
    image(img, this.x, this.y, 10, 10);
    
  }
}