var game = new Phaser.Game(800, 800, Phaser.AUTO, '')
var GAME_OVER = false, map, layer;
var speed, superSlime, health;
var player, cursor, jumpButton, attackButton, fireButton, accessMenuButton, accessMapButton, inventory = {}, HP = 5, alive = true, gunBlade, bullet;

// The list of states will go here
game.state.add("boot", bootState);
game.state.add("credits", creditState);
game.state.add("mainMenu", menuState);
game.state.add("play", playState);
game.state.add("shoppingMenu", shopState);


game.state.start("boot");