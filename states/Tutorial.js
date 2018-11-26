var tutorial = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 500;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.add.tileSprite(0, 0, 800, 600, 'background1');
        
        // Map
        map = game.add.tilemap('tilemap');
        map.addTilesetImage('theSpelunker_tilemap', 'tiles');
        
        ground = map.createLayer('ground');
        ground.resizeWorld();
        
        map.setCollisionBetween(1, 12, true, 'ground');
        
        // Player
        player = game.add.sprite(700, 30, 'playerSprite');
        player.animations.add('run', [0, 1, 2, 3, 4, 5], 10, true);
        player.animations.add('stand', [6], 1, true);
        player.animations.add('jump', [7], 1, true);
        playerAttack = player.animations.add('attack', [8, 9, 10], 5, false);
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.15, 0.15);
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        game.camera.follow(player);
        player.body.setSize(200, 10, 120, 517);
        
        canAttack = true;
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
        
        // Slime
        slime = game.add.sprite(700, 500, 'slimeSprite');
        slimeWalk = slime.animations.add('slimeWalk', [0, 1, 2, 3]);
        slimeAttack = slime.animations.add('slimeAttack', [4, 5, 6]);
        slime.anchor.setTo(0.5, 0.5);
        slime.scale.setTo(0.15, 0.15);
        game.physics.enable(slime);
        slime.body.collideWorldBounds = true;
        slime.body.setSize(700, 550, 0, 129);
        this.slimeWalk();
        
        // Tutorial Text
        game.add.text(game.world.width-220, 200, 'Move: LEFT/RIGHT ARROW \nJump: SPACEBAR \nAttack: D \nMenu: M', {font: '16px Comic Sans MS', fill: '#fff'});
        
        // Music
        mainBG = game.add.audio('mainMusic', 1, true);
        mainBG.play();
    },

    update: function() {
        
        // Hitboxes
        game.physics.arcade.overlap(hitbox1, slime);
        game.physics.arcade.collide(hitbox1, ground);
        if (canAttack) {
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
            player.body.velocity.y = -320;
        }
        
        if (!attackButton.isDown) {
            if (player.body.onFloor()) {
                if (cursors.left.isDown) {
                    player.body.velocity.x = -175;
                    player.scale.setTo(-0.15, 0.15);
                    facing = -1;
                    player.play('run');
                } else if (cursors.right.isDown) {
                    player.body.velocity.x = 175;
                    player.scale.setTo(0.15, 0.15);
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
        
        // Enemy Physics
        game.physics.arcade.collide(slime, ground);
        
        // Pause Menu
        if (menuButton.isDown) {
            game.paused = true;
            menu = game.add.sprite(game.world.width/2, game.world.height/2, 'menuButton');
            menu.anchor.setTo(0.5, 0.5);
        }
        
        game.input.onDown.add(this.unpause, self);
    },
    
    playerAttack: function(){
        if (canAttack) {
            hitbox1.body.enable = true;
            player.play('attack');
            canAttack = false;
            game.time.events.add(200, function(){
                hitbox1.body.enable = false;
                canAttack = true;
            }, this);
        }
        playerAttack.onComplete.add(this.playerIdle, this);
    },
    
    playerIdle: function(){
        player.play('stand');
    },

    attackHit: function(){
        slime.kill();
    },
    
    slimeWalk: function(){
        if (player.x <= slime.x){
            slime.body.velocity.x = -30;
            slime.scale.setTo(-0.15, 0.15);
            slime.play('slimeWalk', 10, true);
        } else {
            slime.body.velocity.x = 30;
            slime.scale.setTo(0.15, 0.15);
            slime.play('slimeWalk', 10, true);
        }
        slimeWalk.onLoop.add(this.monsterWalkLooped, this);
        slimeWalk.onComplete.add(this.slimeAttack, this);
    },
    
    monsterWalkLooped: function(sprite, animation){
        if (animation.loopCount === 3){
            animation.loop = false;
        }
    },
    
    slimeAttack: function(){
        if (player.x <= slime.x){
            slime.body.velocity.x = 0;
            slime.scale.setTo(-0.15, 0.15);
            slime.play('slimeAttack', 5, false);
        } else {
            slime.body.velocity.x = 0;
            slime.scale.setTo(0.15, 0.15);
            slime.play('slimeAttack', 5, false);
        }
        game.physics.arcade.overlap(player, slime, this.playerDamaged, null, this);
        slimeAttack.onComplete.add(this.slimeWalk, this);
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