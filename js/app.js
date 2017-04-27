
// These two global variables are helpers to keep the game
// looping after winning or lossing
var gameWon = false;
var gameLost = false;

// - - - - - - - - ENEMY  - - - - - - - - //

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = randomLocationX();
    this.y = randomLocationY();
    this.speed = randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x =  this.x + this.speed * dt;
      // keeps the enemy moving in loops inside the canvas if its
      // x location is > than 500 it gets move to a negative pos.
      if (this.x  > 500){
          this.x  = randomBackLoc();
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// - - - - - - - - PLAYER  - - - - - - - - //

// Player class with its own definitions
var Player = function(){
  this.sprite = 'images/char-cat-girl.png';
  this.x = 200;
  this.y = 300;
  this.score = 0;
};

// This Player class has this function to
// updates all locations and also check for Collisions
Player.prototype.update = function(){
};

// This Player class has this function to draw
// the image after getting the new locations
Player.prototype.render = function(){
  a = Resources.get(this.sprite);
  b = this.x;
  c = this.y;
  ctx.drawImage(a, b, c);
};

// move the player according to input from keyboards
Player.prototype.handleInput = function(e){
  var dx = 100; // variables that help to keep even moves
  var dy = 80;  // on y and x when displacing on canvas

    // move to the left
    if(e === 'left'){
      player.x -= dx;
    // keeps the player inside the canvas
      if(player.x < 0){
        player.x += dx;
      }
    // move to the right
    }else if(e === 'right'){
      player.x += dx;
    // keeps the player inside the canvas
      if(player.x > 400){
        player.x -= dx;
      }
    // move to the up
    }else if(e === 'up'){
      player.y -= dy;
      // keeps the player outside the water and inside the canvas
      if (player.y < 1){
        console.log("Player y 1: " + player.y)
        resetPlayerifTouchWater(player.y);
      }
    // move to the down
    }else if(e === 'down'){
      player.y += dy;
      // keeps the player inside the canvas
      if(player.y > 400){
        player.y -= dy;
      }
    }
};

// - - - - - - - - GEMS  - - - - - - - - //

// Gem class with its own definitions
var Gem = function(){
  this.sprite = 'images/Gem Orange small.png';
  this.x = randomLocationX();
  this.y = randomLocationGemY();
  this.speed = randomSpeed();
  this.visible = true;
};

// This function draws the image after getting the new locations
Gem.prototype.render = function() {
  if (this.visible === true){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// This function allows gems to move at diferent speeds
Gem.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      this.x = this.x + this.speed * dt;
       // keeps the enemy moving in loops inside the canvas if its
       // x location is > than 500 it gets move to a negative pos.
       if (this.x > 500){
         this.x = randomBackLoc();
       }
};

// - - - - - - - - HELPER FUNCTIONS  - - - - - - - - //

// If the player reaches the water the game should be reset
var resetPlayerifTouchWater = function(y){
    player.y =300;
    player.x =200;
};

// This function give us a random number between 0 to 400
// to place elements on the X axis inside canvas
var randomLocationX = function(){
  var min = 0;
  var max = 400;
  min = Math.ceil(min);
  max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This random function gives us numbers between 1 to 3 to find
// a random row out of the 3 available to locate the objetc.
var randomOption = function(){
  var min = 1;
  var max = 3;
  min = Math.ceil(min);
  max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This function give us an exact location based on the
// ramdonOption function to place ENEMIES on the Y axis.
var arrayLoc = new Array();
var randomLocationY = function(){

  do{
    var loc = randomOption();
      if (loc === 1 && arrayLoc.includes(loc) != true){
        arrayLoc.push(loc);
        return 60;
      }else if (loc === 2 && arrayLoc.includes(loc) != true){
        arrayLoc.push(loc);
        return 135;
      }else if (loc === 3 && arrayLoc.includes(loc) != true){
        arrayLoc.push(loc);
        return 215;
      }else if(arrayLoc.includes(1) === true && arrayLoc.includes(2) === true && arrayLoc.includes(3) === true){
        arrayLoc.push(0);
        return 215;
      }
    }while(arrayLoc.length != 4);
  };

// This function give us an exact location based on the
// ramdonOption function to place GEMS on the Y axis (The function above
// and dthis one differ because the size of the gem was modified).
var arrayLocGem = new Array();
var randomLocationGemY = function(){
  do{
    var loc = randomOption();
      if (loc === 1 && arrayLocGem.includes(loc) != true){
        arrayLocGem.push(loc);
        return 105;
      }else if (loc === 2 && arrayLocGem.includes(loc) != true){
        arrayLocGem.push(loc);
        return 185;
      }else if (loc === 3 && arrayLocGem.includes(loc) != true){
        arrayLocGem.push(loc);
        return 270;
      }
    }while(arrayLocGem.length != 3);
};

// This function give us an random location on the X axis to move back
// the vehicle inside the canvas and keep looping.
var randomBackLoc = function(){
  var min = -400;
  var max = -150;
  min = Math.ceil(min);
  max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This function returns a random Speed for the vehicles to move
var randomSpeed = function(){
  var min = 80;
  var max = 300;
  min = Math.ceil(min);
  max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// - - - - - - - - CREATING OBJECTS  - - - - - - - - //

// Place all enemy objects in an array called allEnemies
var allEnemies = new Array();
for(var i = 0 ; i < 4; i++){
  allEnemies.push(new Enemy());
};

// Place the player object in a variable called player
var player = new Player();

// Creating the gems in an array called allGems
var allGems = new Array();
for(var i = 0 ; i < 3; i++){
  allGems.push(new Gem());
};

// - - - - - - - - EVENR LISTENERS  - - - - - - - - //

// This initiates the program
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

// this section resets the game after the game is done
    if (gameWon==true) {
      gameWon = false;
      document.location.reload();
    }else if(gameLost === true){
      gameLost = false;
      document.location.reload();
    }
//this handles the keyboard once is a buttom is pressed
    player.handleInput(allowedKeys[e.keyCode]);
});
x
