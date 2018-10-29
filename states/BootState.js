var bootState = {
    preload: function() {
        game.load.image('background1', 'assets/backgrounds/game_background_1.png');
        
        // Tilemap and Tiles
        game.load.tilemap('tilemap', 'assets/tilemaps/theSpelunker_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles','assets/tilemaps/theSpelunker_tilemap.png');
        
        // Player
        game.load.spritesheet('playerSprite','assets/spritesheets/player_spritesheet.png', 660, 1045);
        
        // Boss
        game.load.spritesheet('slimeAttack','assets/spritesheets/slime_attack_spritesheet.png',631,679);
        game.load.spritesheet('slimeMove','assets/spritesheets/slime_move_spritesheet.png',631,679);
        
        // Audio
        game.load.audio('level3Theme', 'assets/music/level3.mp3');
    },
    
    create: function() {
        game.state.start('State0');
    }
};