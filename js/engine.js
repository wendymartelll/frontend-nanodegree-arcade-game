/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */

        // This function will be used to show the message "Game over" OR "You won".
        renderWinner();

        // if true stop drawing bugs and everything else. to let message above be written
        if(gameWon === false && gameLost === false){
          update(dt);
          render();
        }

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    };

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data.
     * This update at every move of the player to check collisions with the gem or the enemy
     */
    function update(dt) {
        updateEntities(dt);
        allGems.forEach(function(gem){
          // We need the width, height of the image of the vehicle and player
          // to allow updates all times
          oX = gem.x;
          oY = gem.y;
          oH = 30;
          oW = 37;
          pX = player.x;
          pY = player.y;
          pH = 68;
          pW = 32;

          // here if checkCollisions is true the gem visibility will chcange
          // and add points to the score
          var flagGem = checkCollisions(pX, pY, pH, pW, oX, oY, oH, oW);
          if (flagGem === true && gem.visible === true){
            gem.visible = false;
            player.score += 100;
            }
        });

        // We need the width, height of the image of the vehicle and player
        // Updates the player's and enemy's location. The X & Y position is
        // needed it by getting the diferencial between
        // the bleed and the actual graphic from both the enemy and the player
        allEnemies.forEach(function(enemy){
          oX = enemy.x;
          oY = enemy.y;
          oH = 30;
          oW = 60;
          pX = player.x;
          pY = player.y ;
          pH = 68;
          pW = 32;

          // here if checkCollisions is true the player's position will be reset
          // and deduct points of the score
          var flagEnemy = checkCollisions(pX, pY, pH, pW, oX, oY, oH, oW);
            if (flagEnemy === true){
              player.y = 300;
              player.x = 200;
              player.score -= 50;
            }
          });
    };

    // This function draws the score in the canvas
    var drawScore = function(){
      var score = player.score;
      // Text attributes
      ctx.font = "20pt Impact";
      ctx.textAlign = "center";
      ctx.fillStyle = "#5169D4";
      ctx.fillText("score: " + score, 400, 25);
    };

    // This function deletes and draw a new score after the change in the score
    function renderScore(){
        ctx.clearRect(0,0,505,30);
        drawScore();
    };

    //Handles collision of the player with the vehicle, it compares the X location against
    //the sum of its X location + widht to check if they are overlapping
    //if true keeps comparing for Y for each element.
    function checkCollisions (pX, pY, pH, pW, oX, oY, oH, oW ){
      var clause1 =      pX < oX + oW;
      var clause2 = pX + pW > oX;
      var clause3 =      pY < oY + oH;
      var clause4 = pH + pY > oY;

      if (clause1 && clause2 && clause3 && clause4) {
        return true;
      }else{
        return false;
      }
    };

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies & allGems array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        allGems.forEach(function(gem){
            gem.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        };
        // Updates the score
        renderScore();
        renderEntities();
    }

    // This function counts how many gems were eaten and increases the winner counter
    var renderWinner = function(){
      var winner = 0;
      var looser = 0;
      allGems.forEach(function(gem){
        if (gem.visible === false){
          ++winner;
        }else{
          ++looser;
        }
      });
      printWinner(winner, looser);
    };

    // This function prints the winner and looser message based on the counter and player score
    var printWinner = function(winner, looser){
      if (winner === 3){
          ctx.drawImage(Resources.get('images/youWon.png'), 0, 0);
          if (gameWon === false){
            alert("You win! Press any key afterwards to start a new game");
            winner = 0;
          }
          gameWon = true;
      };

      if(player.score < 0 && looser >= 1){
          ctx.drawImage(Resources.get('images/youLost.png'), 0, 0);
          if (gameLost === false){
            alert ("GAME OVER");
          }
          gameLost = true;
      };
    };

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        allGems.forEach(function(gem) {
            gem.render();
        });
        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/Gem Orange small.png',
        'images/Heart.png',
        'images/Key.png',
        'images/Gem Green.png',
        'images/youWon.png',
        'images/youLost.png',
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
