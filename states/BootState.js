var bootState = {
    preload: function() {
        // Backgrounds
        game.load.image('background1', 'assets/backgrounds/game_background_1.png');
        game.load.image('titleBG', 'assets/backgrounds/title_screen_background.png');
        
        // Tilemap and Tiles
        game.load.tilemap('tilemap', 'assets/tilemaps/theSpelunker_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('tilemap1', 'assets/tilemaps/tilemap1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles','assets/tilemaps/theSpelunker_tilemap.png');
        
        // Player
        game.load.spritesheet('playerSprite','assets/spritesheets/player_animation_spritesheet.png', 500, 527);
        
        // Monsters
        game.load.spritesheet('slimeSprite','assets/spritesheets/slime_spritesheet_combined.png',599,679);
        
        // Health Orb
        game.load.image('healthOrb', 'assets/sprites/health_orb.png');
        
        // Title Screen and Buttons
        game.load.image('title', 'assets/sprites/title_screen_title_icon.png');
        game.load.image('playButton', 'assets/sprites/title_screen_play_button.png');
        game.load.image('continueButton', 'assets/sprites/pause_button.png');
        game.load.image('tutorialButton', 'assets/sprites/tutorial_button.png');
        game.load.image('menuButton', 'assets/sprites/exit_and_resume_buttons.png');
        
        // Audio
        game.load.audio('mainMusic', 'assets/music/bg_music.wav');
        game.load.audio('bossMusic', 'assets/music/final_boss_music.wav');
    },
    
    create: function() {
        game.state.start('main');
    }
}