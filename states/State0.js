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
        
        alive = true;
        HP = 5;
        type = 'player';
        fireCoolDown = 0;
        timer = 0;
        this.checkTimer();
        
        // Keyboard
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        accessMenuButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        
        // Boss Slime
        bossSlime = game.add.sprite(600, 600, 'slimeMove');
        bossSlime.animations.add('slimeWalk', [0, 1, 2, 3], 1, true);
        bossSlime.anchor.setTo(0.5, 0.5);
        bossSlime.scale.setTo(0.2, 0.2);
        game.physics.enable(bossSlime);
        bossSlime.body.collideWorldBounds = true;
        bossSlime.health = 50;
    },

    update: function() {
        // Player Movement
        game.physics.arcade.collide(player, ground);
        
        if (cursors.left.isDown) {
            player.body.velocity.x = -100;
            player.scale.setTo(-0.1, 0.1);
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
            player.body.velocity.y = -175;
            player.scale.setTo(0.1, 0.1);
        }
        
        // Boss Slime Movement
        game.physics.arcade.collide(bossSlime, ground);
        if (player.x <= bossSlime.x){
            if (game.time.now - timer > 5000){
                bossSlime.body.velocity.x = -50;
                bossSlime.scale.setTo(-0.2, 0.2);
                bossSlime.play('slimeWalk');
            }
        } else {
            if (game.time.now - timer > 5000){
                bossSlime.body.velocity.x = 50;
                bossSlime.scale.setTo(0.2, 0.2);
                bossSlime.play('slimeWalk');
            }
        }
        
        // Boss Slime Attack
        game.time.events.loop(Phaser.Time.SECOND*8, bossSlime.bossSlimeAttack, this);
        
        /*if (GAME_OVER) {
            game.state.start('credits');
        }*/
    },
    
    bossSlimeAttack: function(){
        var bossSlimeAttack = game.add.sprite('slimeAttack');
        bossSlimeAttack.animations.add('slimeAttack1', [0, 1, 2], 20, true);
        if (player.x <= bossSlime.x){
            bossSlimeAttack.scale.setTo(-0.2, 0.2);
            bossSlimeAttack.play('slimeAttack');
        } else {
            bossSlimeAttack.scale.setTo(0.2, 0.2);
            bossSlimeAttack.play('slimeAttack');
        }
        game.physics.arcade.overlap(player, bossSlimeAttack, isDamaged, null, this);
    },
    
    isDamaged: function(){
        HP -= 1;
    },
    
    checkTimer: function(){
        timer = game.time.now;
    }
};