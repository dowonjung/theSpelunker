var play1 = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.arcade.gravity.y = 1200;
        background = game.add.tileSprite(0, 0, 3200, 600, 'background1');
        
        // Map
        map = game.add.tilemap('tilemap1');
        map.addTilesetImage('theSpelunker_tilemap', 'tiles');
        
        ground = map.createLayer('ground');
        ground.resizeWorld();
        
        map.setCollisionBetween(1, 36, true, 'ground');
        
        // Player
        player = game.add.sprite(700, 30, 'playerSprite');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.15, 0.15);
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        game.camera.follow(player);
        player.body.setSize(200, 10, 120, 517);
        isGameOver = false;
        attacking = false;
        facing = 1;
        canAttack = true;
        attackTimer = 0;
        
        // Player Animations
        player.animations.add('run', [0, 1, 2, 3, 4, 5], 10, true);
        player.animations.add('stand', [6], 1, true);
        player.animations.add('jump', [7], 1, true);
        playerAttack = player.animations.add('attack', [8, 9, 10], 20);
        playerAttack.onComplete.add(function(){
            attacking = false;
        }, this);
        
        // Player Health
        HP = game.add.group();
        livesText = game.add.text(10, 10, 'Lives: ', {font: '24px Comic Sans MS', fill: '#fff'});
        livesText.fixedToCamera = true;
        
        for(var i=0; i<5; i++){
            var healthOrb = HP.create(90+(35*i), 30, 'healthOrb');
            healthOrb.anchor.setTo(0.5, 0.5);
            healthOrb.scale.setTo(0.03, 0.03);
            healthOrb.fixedToCamera = true;
        }
        
        // Hitboxes
        hitboxes = game.add.group();
        hitboxes.enableBody = true;
        player.addChild(hitboxes);
        
        hitbox1 = hitboxes.create(0, 0, null);
        hitbox1.anchor.setTo(0.5, 0.5);
        hitbox1.body.onOverlap = new Phaser.Signal();
        hitbox1.body.onOverlap.add(this.attackHit, this);
        hitbox1.body.enable = false;        
        
        // Keyboard
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        menuButton = game.input.keyboard.addKey(Phaser.Keyboard.M);
        
        // Game Over Sprite
        gameOver = game.add.sprite(game.world.centerX, game.world.centerY, 'gameOverButton');
        gameOver.anchor.setTo(0.5, 0.5);
        gameOver.visible = false;
        
        // Music
        mainBG = game.add.audio('mainMusic', 1, true);
        mainBG.play();
        swordSlash = game.add.audio('swordSlash');
        
        // Slime
        slime = game.add.group();
        slime.enableBody = true;
        slime.physicsBodyType = Phaser.Physics.ARCADE;
        slime.setAll('anchor.x', 0.5);
        slime.setAll('anchor.y', 0.5);
        slime.setAll('scale.x', 0.15);
        slime.setAll('scale.y', 0.15);
        slime.setAll('outOfBoundsKill', true);
        slime.setAll('checkWorldBounds', true);
        slime.callAll('animations.add', 'animations', [0, 1, 2, 3], 10, true);
        slime.callAll('animations.add', 'animations', [4, 5, 6], 5, false);
        
        slime1 = slime.create(100, 400, 'slimeSprite');
        slime1.body.setSize(700, 550, 0, 129);
        
        slime.callAll('slimeWalk', null);
    },
    
    update: function(){        
        // Timer Update
        if(!isGameOver){
            this.playerAttackTimer();
        }
        
        // Hitboxes
        game.physics.arcade.overlap(hitbox1, slime1);
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
            player.body.velocity.y = -500;
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
        
        // Pause Menu
        if (menuButton.isDown) {
            game.paused = true;
            menu = game.add.sprite(400, 300, 'menuButton');
            menu.anchor.setTo(0.5, 0.5);
            menu.fixedToCamera = true;
        }
        
        game.input.onDown.add(this.unpause, self);
        
        // Enemy Physics
        game.physics.arcade.collide(slime1, ground);
    },
    
    playerAttack: function(){
        if (!attacking) {
            attacking = true;
            hitbox1.body.enable = true;
            player.play('attack');
            swordSlash.play();
            var atkTimer = game.time.create(true);
            atkTimer.add(200, function(){
                attacking = false;
                hitbox1.body.enable = false;
            }, this);
            atkTimer.start();
        }
    },
    
    attackHit: function(enemy){
        enemy.kill();
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
            gameOver.visible = true;
            gameOver.inputEnabled = true;
            gameOver.events.onInputDown.add(this.gameOver, this);
        }
    },
    
    slimeWalk: function(){
        if (player.x <= slime.x){
            slime.body.velocity.x = -30;
            slime.scale.setTo(-0.15, 0.15);
            slime.play('slimeWalk');
        } else {
            slime.body.velocity.x = 30;
            slime.scale.setTo(0.15, 0.15);
            slime.play('slimeWalk');
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
            slime.play('slimeAttack');
        } else {
            slime.body.velocity.x = 0;
            slime.scale.setTo(0.15, 0.15);
            slime.play('slimeAttack');
        }
        game.physics.arcade.overlap(player, slime, this.playerDamaged, null, this);
        slimeAttack.onComplete.add(this.slimeWalk, this);
    },
    
    gameOver: function(){
        mainBG.stop();
        game.state.start('main');
    },
    
    unpause: function(){
        if (game.paused){
            var x1 = 400 - 649/2, x2 = 400 + 649/2,
                y1 = 300 - 139/2, y2 = 300 + 139/2;
            
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