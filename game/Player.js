var playerFn = {
    
    preload: function() {

    },
    
    create: function() {
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'playerRun');
        player.scale.setTo(0.1, 0.1);
        player.anchor.setTo(0.5, 0.5);
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        player.animations.add('run', [0, 1, 2, 3, 4]);
        
        // Keyboard settings
        cursor = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        accessMenuButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        accessMapButton = game.input.keyboard.addKey(Phaser.Keyboard.TAB);
        
        // Camera settings
        game.camera.follow(player); // Camera follows player
        
        // Gunblade Settings
        //gunBlade = game.add.sprite(); // Add our gunblade sprite.
        
        
    },
    
    update: function() {
        if (cursor.left.isDown) {
            player.body.velocity.x = -75;
            player.scale.setTo(0.1, 0.1);
            player.animations.play('run', 14, true);
        
        } else if (cursor.right.isDown) {
            player.body.velocity.x = 75;
            player.scale.setTo(0.1, 0.1);
            player.animations.play('run', 14, true);
        
        } else if ((jumpButton.isDown) && (player.body.touching.DOWN)) {
            player.body.velocity.y = -60;
            player.image('playerJump');
        
        } else {
            player.animations.stop('playerRun');
            player.frame = 0;
        }
    },
    
    fire: function() {
        if (fireButton.isDown) {
            // Shoot gunblade
        }
    },
    
    attack: function() {
        if (attackButton.isDown) {
            // Slash and dice
        }
    },
    
    accessMap: function() {
        if (accessMapButton.isDown) {
            // Access map
        }
    },
    
    accessMenu: function() {
        if (accessMenuButton.isDown) {
            // Access menu, settings, inventory
        }
    }
}