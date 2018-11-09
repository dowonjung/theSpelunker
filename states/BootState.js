var bootState = {
    preload: function() {
        game.load.image('background1', 'assets/backgrounds/game_background_1.png');
        
        // Tilemap and Tiles
        game.load.tilemap('tilemap', 'assets/tilemaps/theSpelunker_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles','assets/tilemaps/theSpelunker_tilemap.png');
        
        // Player
        game.load.spritesheet('playerSprite','assets/spritesheets/player_animation_spritesheet.png', 500, 527);
        
        // Monsters
        game.load.spritesheet('slimeSprite','assets/spritesheets/slime_spritesheet_combined.png',599,679);
        
        // Audio
        game.load.audio('level3Theme', 'assets/music/level3.mp3');
    },
    
    create: function() {
        game.state.start('tutorial');
    }
};