var game = new Phaser.Game(800, 800, Phaser.AUTO);

game.state.add('Boot', bootState);
game.state.add('State0', state0);

game.state.start('Boot');