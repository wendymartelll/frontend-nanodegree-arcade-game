# Racing for Gems :gem: :runner:

Racing for Gems is a game that uses canvas - **javascript, jQuery, HTML5, CSS**. It creates animations inside of a canvas. The game is about a player who needs to eat 3 gems by avoiding collisions with enemies in these case these are 4 bugs.

# Quickstart

####  Using your normal browser
  1. Clone this repo.
  2. Open all files : `app.js`, `engine.js`, `resources.js`, `README.md` file and `index.html `in your favorite IDE
  3. Load in Chrome `index.html`

#### How does the game works?
 In this game, your have one player, four enemies, and three gems. The goal of the player is to collect all gems. The player can move left, right, up, down. The enemies move in varying speeds on the paved block portion of the scene. Once a player collides with an enemy, the player is reset to his original position and the score decreases by 50 points. If the player collides with a gem, the gem disappears and the score increases by 100 points. The score increases each time the player reaches the water. Once the player collects all the gems the game is won.

# Putting the pieces together
We have provided the art assets and game engine for you. The repository contains images and js. folders. Once you have downloaded the files of the project. you will have to edit app.js to built the game.
1. The css folder contains a style.css file which you can edit if you want to customize the layout.
2. The images folder contains the png image files, which are used when displaying the game, all images come from here.
3. The js. folder contains the app.js, engine.js needed to run the game and a resources.js file.
4. Index.html should load the game.
5. README.md contains all the information on how to load and play the game.

### About the files:

- ### index.html
    These file initiates the program. Integrates all the other files.

- ### app.js
    Here you will find the Object Oriented javascript, where the player, the enemy and gem classes are created. Along with the main functions to provide functionalities to the objects.

- ### engine.js
    This file provides the game loop functionality.
A game engine works by drawing (Render function) the entire game screen over and over (Update function), kind of like a flipbook you may have created as a kid.

- ### resources.js
    This is simply an image loading utility. It eases the process of loading image files so that they can be used within the game.

- ### style.css
    This file allows to modify the layout of the page. HTML only.

### Development
Want to contribute? Great!
In adition of what is already built, you can add more cool features.
For instance:
  - Player selection: allow the user to select the image for the player character before starting the game. You can use the different character images provided in the images folder (we’ll get to that below).
 - Collectables: you can add more gems to the game, allowing the player to collect them to make the game more interesting.
 - Lives: you can add extra lives represented by a heart.
 - Anything else you like!
