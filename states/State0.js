var state0 = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 400;
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
        player = game.add.sprite(200, game.world.centerY, 'playerAnm');
        player.animations.add('stand', [0], 1, true);
        player.animations.add('run', [1, 2, 3, 4, 5, 6], 10, true);
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.1, 0.1);
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        game.camera.follow(player);
        
        alive = true;
        HP = 5;
        type = 'player';
        fireCoolDown = 0;
        
        // Keyboard
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        accessMenuButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        
        // Slime
        slime = game.add.sprite(600, 600, 'slimeMove');
        slime.animations.add('slimeWalk');
        slime.anchor.setTo(0.5, 0.5);
        slime.scale.setTo(0.2, 0.2);
        game.physics.enable(slime);
        slime.body.collideWorldBounds = true;
        slime.health = 50;
    },

    update: function() {
        // Player Movement
        game.physics.arcade.collide(player, ground);
        
        if (cursors.left.isDown) {
            player.body.velocity.x = -125;
            player.scale.setTo(-0.1, 0.1);
            player.play('run');
        
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 125;
            player.scale.setTo(0.1, 0.1);
            player.play('run');
        
        } else {
            player.body.velocity.x = 0;
            player.play('stand');
        }
        
        if (jumpButton.isDown && player.body.onFloor()) {
            player.body.velocity.y = -400;
            player.scale.setTo(0.1, 0.1);
        }
        
        // Slime Movement
        game.physics.arcade.collide(slime, ground);
        if (player.x <= slime.x){
            slime.body.velocity.x = -50;
            slime.scale.setTo(-0.2, 0.2);
            slime.play('slimeWalk', 10, true);
        } else {
            slime.body.velocity.x = 50;
            slime.scale.setTo(0.2, 0.2);
            slime.play('slimeWalk', 10, true);
        }
        
        // Slime Attack
        //game.time.events.loop(Phaser.Timer.SECOND*5, this.slimeAttack, this);
    },
        
    slimeAttack: function(){
        slime.loadTexture('slimeAttack', 0);
        slime.animations.add('slimeAttack');
        if (player.x <= slime.x){
            slime.scale.setTo(-0.2, 0.2);
            slime.play('slimeAttack', 2, false, true);
        } else {
            slime.scale.setTo(0.2, 0.2);
            slime.play('slimeAttack', 2, false, true);
        }
        game.physics.arcade.overlap(player, slime, this.isDamaged, null, this);
    },
    
    isDamaged: function(){
        HP -= 1;
    },
};