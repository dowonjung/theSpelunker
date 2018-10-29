var state0 = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 300;
        game.world.setBounds(0,0,800,800);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.tileSprite(0, 0, 800, 800, 'background1');
        
        // Map
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('theSpelunker_tilemap', 'tiles');
        
        ground = map.createLayer('ground');
        ground.resizeWorld();
        
        map.setCollisionBetween(1, 12, true, 'ground');
        
        // Player
        player = game.add.sprite(200, game.world.centerY, 'playerSprite');
        player.animations.add('run', [6, 0, 1, 2, 3, 4, 5], 10, true);
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.1, 0.1);
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        game.camera.follow(player);
        
        isDamaged = -1;
        alive = true;
        type = 'player';
        fireCoolDown = 0;
        
        // Keyboard
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        accessMenuButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        
    },

    update: function() {
        //Player Movement
        game.physics.arcade.collide(player, ground);
        
        if (cursors.left.isDown) {
            player.body.velocity.x = -100;
            player.scale.setTo(0.1, 0.1);
            player.play('run');
        
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 100;
            player.scale.setTo(0.1, 0.1);
            player.play('run');
        
        } else {
            player.animations.stop('run');
            player.body.velocity.x = 0;
            player.frame = 0;
        }
        
        if (jumpButton.isDown && player.body.onFloor()) {
            player.body.velocity.y = -150;
            player.scale.setTo(0.1, 0.1);
        }
        
        /*if (GAME_OVER) {
            game.state.start('credits');
        }*/
    }
};