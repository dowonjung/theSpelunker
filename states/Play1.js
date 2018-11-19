var play1 = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 325;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        background = game.add.tileSprite(0, 0, 3200, 600, 'background1');
        
        // Map
        map = game.add.tilemap('tilemap1');
        map.addTilesetImage('theSpelunker_tilemap', 'tiles');
        
        ground = map.createLayer('ground');
        ground.resizeWorld();
        
        map.setCollisionBetween(1, 12, true, 'ground');
        
        // Player
        player = game.add.sprite(100, 100, 'playerSprite');
        player.animations.add('run', [0, 1, 2, 3, 4, 5], 10, true);
        player.animations.add('stand', [6], 1, true);
        player.animations.add('jump', [7], 1, true);
        player.animations.add('attack', [8, 9, 10], 5, false);
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.2, 0.2);
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        game.camera.follow(player);
        player.body.setSize(200, 10, 120, 517);
        
        attacking = false;
        facing = 1;
        
        // Player Health
        HP = game.add.group();
        game.add.text(10, 10, 'Lives: ', {font: '24px Comic Sans MS', fill: '#fff'});
        
        for(var i=0; i<5; i++){
            var healthOrb = HP.create(90+(35*i), 30, 'healthOrb');
            healthOrb.anchor.setTo(0.5, 0.5);
            healthOrb.scale.setTo(0.03, 0.03);
        }
        
        // State Text
        stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {font: '84px Comic Sans MS', fill: '#fff'});
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
        
        // Hitboxes
        hitboxes = game.add.group();
        hitboxes.enableBody = true;
        player.addChild(hitboxes);
        
        hitbox1 = hitboxes.create(0, 0, null);
        hitbox1.anchor.setTo(0.5, 0.5);
        hitbox1.body.onOverlap = new Phaser.Signal();
        hitbox1.body.onOverlap.add(this.attackHit);
        hitbox1.body.enable = false;        
        
        // Keyboard
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        menuButton = game.input.keyboard.addKey(Phaser.Keyboard.M);
        
        // Music
        mainBG = game.add.audio('mainMusic', 1, true);
        mainBG.play();
    },
    
    update: function(){        
        // Hitboxes
        game.physics.arcade.collide(hitbox1, ground);
        if (attacking) {
            hitbox1.body.setSize(64, 96, 36*facing, -40);
        }
        
        // Player Attack and Movement
        game.physics.arcade.collide(player, ground);
        
        if (attackButton.isDown) {
            player.body.velocity.x = 0;
            if (attackButton.justPressed()) {
                this.playerAttack();
            }
        }
        
        if (jumpButton.isDown && player.body.onFloor()) {
            player.body.velocity.y = -330;
        }
        
        if (!attackButton.isDown) {
            if (player.body.onFloor()) {
                if (cursors.left.isDown) {
                    player.body.velocity.x = -175;
                    player.scale.setTo(-0.2, 0.2);
                    facing = -1;
                    player.play('run');
                } else if (cursors.right.isDown) {
                    player.body.velocity.x = 175;
                    player.scale.setTo(0.2, 0.2);
                    facing = 1;
                    player.play('run');
                } else {
                    player.body.velocity.x = 0;
                    player.play('stand');
                }
            } else {
                player.play('jump');
            }
        }
        
        // Pause Menu
        if (menuButton.isDown) {
            game.paused = true;
            menu = game.add.sprite(game.world.width/2, game.world.height/2, 'menuButton');
            menu.anchor.setTo(0.5, 0.5);
        }
        
        game.input.onDown.add(this.unpause, self);
    },
    
    playerAttack: function(){
        if (!attacking) {
            attacking = true;
            hitbox1.body.enable = true;
            player.play('attack');
            var atkTimer = game.time.create(true);
            atkTimer.add(200, function(){
                attacking = false;
                hitbox1.body.enable = false;
            }, this);
            atkTimer.start();
        }
    },
    
    attackHit: function(){
        
    },
    
    playerDamaged: function(){
        // When player is damaged
        alive = HP.getFirstAlive();
        if(alive){
            alive.kill();
        }
        
        // If player is dead
        if(HP.countLiving()<1){
            player.kill();
            stateText.text = 'GAME OVER \n Press Enter';
            stateText.visible = true;
            game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.gameOver, this);
        }
    },
    
    gameOver: function(){
        mainBG.stop();
        game.state.start('main');
    },
    
    unpause: function(){
        if (game.paused){
            var x1 = game.world.width/2 - 649/2, x2 = game.world.width/2 + 649/2,
                y1 = game.world.height/2 - 139/2, y2 = game.world.height/2 + 139/2;
            
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2){
                if(event.x > x1 && event.x < x1 + 230){
                    game.paused = false;
                    mainBG.stop();
                    game.state.start('main');
                } else if(event.x < x2 && event.x > x1 + 270){
                    menu.destroy();
                    game.paused = false;
                }
            }
        }
    }
}