var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('boot', bootState);
game.state.add('main', mainMenu);
game.state.add('tutorial', tutorial);
game.state.add('play1', play1);
game.state.add('play2', play2);
game.state.add('play3', play3);
game.state.add('boss', boss);
game.state.add('credit', credit);

game.state.start('boot');