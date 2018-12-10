var bootState = {
    preload: function() {
        // Backgrounds
        game.load.image('background1', 'assets/backgrounds/game_background_1.png');
        game.load.image('titleBG', 'assets/backgrounds/title_screen_background.png');
        
        // Tilemap and Tiles
        game.load.tilemap('tilemap', 'assets/tilemaps/theSpelunker_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tilemap1', 'assets/tilemaps/tilemap1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tilemap2', 'assets/tilemaps/tilemap2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tilemap3', 'assets/tilemaps/tilemap3.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('bossmap', 'assets/tilemaps/bossMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles','assets/tilemaps/theSpelunker_tilemap.png');
        
        // Player
        game.load.spritesheet('playerSprite','assets/spritesheets/player_animation_spritesheet.png', 500, 527);
        
        // Enemies
        game.load.spritesheet('slimeSprite','assets/spritesheets/slime_spritesheet_combined.png',599,679);
        game.load.spritesheet('batSprite', 'assets/spritesheets/bat_animation.png', 977, 1200);
        game.load.spritesheet('boss', 'assets/spritesheets/spelunker_final_boss_idle.png', 1000, 924);
        
        // Health Orb
        game.load.image('healthOrb', 'assets/sprites/health_orb.png');
        
        // Skull
        game.load.image('skull', 'assets/sprites/skull_sprite.png');
        
        // Bomb
        game.load.image('bomb', 'assets/sprites/bomb_sprite.png');
        
        // Title Screen and Buttons
        game.load.image('title', 'assets/sprites/title_screen_title_icon.png');
        game.load.image('playButton', 'assets/sprites/title_screen_play_button.png');
        game.load.image('tutorialButton', 'assets/sprites/tutorial_button.png');
        game.load.image('menuButton', 'assets/sprites/exit_and_resume_buttons.png');
        game.load.image('gameOverButton', 'assets/sprites/gameover_button.png');
        
        // Audio
        game.load.audio('mainMusic', 'assets/music/bg_music.wav');
        game.load.audio('bossMusic', 'assets/music/final_boss_music.wav');
        game.load.audio('swordSlash', 'assets/music/sword_slash_1.wav');
        game.load.audio('ending', 'assets/music/credit.mp3');
    },
    
    create: function() {
        game.state.start('main');
    }
}