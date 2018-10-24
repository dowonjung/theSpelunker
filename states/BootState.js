var bootState = {
    
    preload: function() {
        
        // Load collectables & projectiles
//        this.load.image('orbs') // Orbs for purchasing
//        this.load.image('hp1') // HP drop1
//        this.load.image('hp2') // HP drop2
//        
//        this.load.image('playerBullets') // Bullets from player
//        this.load.image('enemyProjectile1') // Enemy projectiles
//        // ...
//        
//        
//        // Load player & enemies, bosses
//        this.load.image('main') // Main character
        game.load.image('playerJump','assets/sprites/player_jump_sprite.png');
        game.load.spritesheet('playerRun','assets/spritesheets/player_run_spritesheet.png',1094,1633);

//        this.load.image('slime') // Slime
//        this.load.image('spider') // Spider
//        this.load.image('bat') // Bat
//        
//        this.load.image('boss1') // Boss 1
//        this.load.image('boss2') // Boss 2
//        this.load.image('robotnik') // "Dr. Robotnik"
//        
//        // Load NPCs
//        this.load.image('shopkeeper') // Shopkeeper
        //load slime animations
        game.load.spritesheet('slimeAttack','assets/spritesheets/slime_attack_spritesheet.png',631,679);
        game.load.spritesheet('slimeMove','assets/spritesheets/slime_move_spritesheet.png',631,679);
        
        //load tilemap
        game.load.tilemap('tilemap', 'assets/tilemaps/theSpelunker_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles','assets/tilemaps/theSpelunker_tilemap.png');
//        
//        // Load audio
//        
//        this.load.audio('mainTheme', 'assets/music/mainTheme.mp3') // Main Menu Theme
//        this.load.audio('level1Theme', 'assets/music/level1.mp3') // Level 1 theme
//        this.load.audio('level2Theme', 'assets/music/level2.mp3') // Level 2 theme
        this.load.audio('level3Theme', 'assets/music/level3.mp3'); // Level 3 theme
//        
//        this.load.audio('slimeSFX1') // Slime sounds
//        // ...
//        
//        this.load.audio('batSFX1') // Bat sounds
//        // ...
//        
//        this.load.audio('spiderSFX1') // Spider sounds
//        // ...
//        
//        this.load.audio('boss1SFX') // Boss 1 sounds
//        // ...
//        
//        this.load.audio('boss2SFX') // Boss 2 sounds
//        // ...
//        
//        this.load.audio('robotnikSFX') // Dr. Robotnik sounds
//        // ...
//        
//        this.load.audio('ambience1') // Ambient sounds
//        // ...
//        
//        
//        // Load GUI components
//        
//        this.load.spritesheet('hpBar') // Health bar
//        
//        this.load.image('settingsButton') // Settings button
//        this.load.image('settingsVolume') // Settings - Volume Control
//        this.load.image('quit') // Settings - Quit (to Main Menu)
//        
//        
//        // Load level structures
//        this.load.image('testPlatforms') // Platforms
//        // ...
//        
//        
//        // Load backgrounds
//        
//        this.load.image('level1BG') // Level 1 BG
//        this.load.image('level2BG') // Level 2 BG
//        this.load.image('level3BG') // Level 3 BG
//        
//        // Load animations
//        
//        this.load.spritesheet('playerRun', 'assets/spritesheets/player_run_spritesheet.png'); // Player movement
//        this.load.spritesheet('playerAttacking') // Player attack
//        this.load.spritesheet('playerAttacked') // Player attacked
//        
//        this.load.spritesheet('slimeMoving') // Slime movement
//        // ...
//        
//        this.load.spritesheet('batMoving') // Bat movement
//        // ...
//        
//        this.load.spritesheet('spiderMoving') // Spider movement
//        // ...
//        
//        this.load.spritesheet('boss1Moving') // Boss 1 movement
//        // ...
//        
//        this.load.spritesheet('boss2Moving') // Boss 2 movement
//        // ...
//        
//        this.load.spritesheet('robotnikMoving') // Dr. Robotnik movement
//        // ...
//        
//        // Load credits
//        
//        this.load.image('devCredits') // For the team
    },
    
    create: function() {
//        this.sound.setDecodedCallback(['mainTheme', 'level1Theme', 'level2Theme', 'level3Theme', 'slimeSFX1', 'batSFX1', 'spiderSFX1', 'boss1SFX1', 'boss2SFX1', 'robotnik', 'ambience1'], function() {
//            this.state.start('play')
//        }, this);
        this.state.start('play');
    },
    
    update: function() {
        // Nothing here.
    }
};