var playState = {
    
    create: function() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,800,800);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#787878';
        
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('theSpelunker_tilemap', 'tiles');
        layer = map.createLayer('ground');
        layer.resizeWorld();
        
        var newPlayer = playerFn.create();
    },

    update: function() {
        
        if (GAME_OVER) {
            game.state.start('credits');
        }
    }
};