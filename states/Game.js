var game = new Phaser.Game(800, 800, Phaser.AUTO);

game.state.add('Boot', bootState);
game.state.add('tutorial', tutorial);

game.state.start('Boot');