var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('boot', bootState);
game.state.add('main', mainMenu);
game.state.add('tutorial', tutorial);
game.state.add('play1', play1);
game.state.add('play2', play2);

game.state.start('boot');