//Kristian Harn
//BlueSpurs INC
//November 24th 2015

//Added by Kristian H - This will draw the enemy and player objects on the screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Added by Kristian H - This will reset the player to the starting position
//We will probably be calling this out in the collision part of my code
Object.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
}

//INITIAL COMMENT - Enemies our player must avoid
//Added by Kristian H - Had to add x,y for the parameters for the Enemy function
//since it will need each enemy created to have a x and y position on the axis
var Enemy = function(x,y) {
    //INITIAL COMMENT - Variables applied to each of our instances go here,
    //INITIAL COMMENT - we've provided one for you to get started

    //INITIAL COMMENT - The image/sprite for our enemies, this uses
    //INITIAL COMMENT - a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Added by Kristian H - x and y coordinates and movement speed are set using the 
    //"this" operator for these axis parameters
    //Stop forgetting that the Math.random functions exist, since this is the best way
    //to produce the random speed and movement of the enemies blocks on the mapping of
    //the program
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
};

//INITIAL COMMENT - Update the enemy's position, required method for game
//INITIAL COMMENT - Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //INITIAL COMMENT - You should multiply any movement by the dt parameter
    //INITIAL COMMENT - which will ensure the game runs at the same speed for
    //INITIAL COMMENT - all computers.
    //Added by Kristian H - If the enemy is to cross off screen, this here will reset
    //the position of the enemy - otherwise, keep this running

    if(this.x <= 550){
        this.x += this.speed * dt;
    }else {
        this.x = -2;
    }

    //THIS IS WHERE I WAS WHEN I LEFT THIS TO TEST SOMETHING - it works with the 1 I
    //found, continue building this 1 step at a time and show Jules that I have it working
    //and I am able to keep afloat with the work load.

    //Added by Kristian H - This if function will verify that whenever the enemies come
    //within 30px of the player's x and y coordinates that the game will trigger
    //the reset function - Since the player would be "Game Over" anyhow (nested if)

    if (player.x >= this.x - 30 && player.x <= this.x + 30){
        if(player.y >= this.y - 30 && player.y <= this.y + 30){
            //Added by Kristian H - I added an alert to let the user know the game
            //was over
            alert("Game Over Bud!");
            this.reset();
        }
    }

};

//INITIAL COMMENT - Now write your own player class
//INITIAL COMMENT - This class requires an update(), render() and
//INITIAL COMMENT - a handleInput() method.

//Added by Kristian H - This will initialize the player along with his position on
//the board setting initial x and y coordinates
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

//INITIAL COMMENT - Now instantiate your objects.
//INITIAL COMMENT - Place all enemy objects in an array called allEnemies
//INITIAL COMMENT - Place the player object in a variable called player

//Added by Kristian H - Used to update the players coordinates by controlling what
//happens with the players coordinates based on which directional buttons were keyed
//in
Player.prototype.update = function(){
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - 50;
        //if right key is pressed and player is not on edge of map increment x 
    }else if (this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;
        //if up key is pressed increment y 
    }else if (this.ctlKey === 'up'){
        this.y = this.y - 50;
        //if down key is pressed and player is not on edge of map decrement y 
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
    }
    this.ctlKey = null;

    //If on water, reset
    if(this.y < 25){
        alert("No Game Over! However you did manage to fall in a river, smooth bud!");
        this.reset();
    }
}

//Added by Kristian H - Handles the key commands entered by the player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
}

//Added by Kristian H - Initializes the enemy and player objects
var allEnemies = [];
(function setEnemies() {
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
}());
var player = new Player();

//INITIAL COMMENT - This listens for key presses and sends the keys to your
//INITIAL COMMENT - Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});