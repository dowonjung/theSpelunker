var play3 = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.physics.arcade.gravity.y = 1200;
        background = game.add.tileSprite(0, 0, 2400, 600, 'background1');
        
        // Map
        map = game.add.tilemap('tilemap3');
        map.addTilesetImage('theSpelunker_tilemap', 'tiles');
        
        ground = map.createLayer('ground');
        ground.resizeWorld();
        
        map.setLayer(ground);
        
        map.setCollisionBetween(1, 36);
        
        map.setCollisionBetween(31, 36);        
        setTileCollision(ground, [31, 32, 33, 34, 35, 36], {
            top: true,
            bottom: false,
            left: false,
            right: false
        });
        
        // Player
        player = game.add.sprite(50, 450, 'playerSprite');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.12, 0.12);
        game.physics.enable(player);
        player.body.collideWorldBounds = true;
        game.camera.follow(player);
        isGameOver = false;
        attacking = false;
        facing = 1;
        canAttack = true;
        attackTimer = 0;
        player.health = 5;
        player.hurt = false;
        
        // Player Animations
        player.animations.add('run', [0, 1, 2, 3, 4, 5], 10, true);
        player.animations.add('stand', [6], 1, true);
        player.animations.add('jump', [7], 1, true);
        playerAttack = player.animations.add('attack', [8, 9, 10], 20);
        playerAttack.onComplete.add(function(){
            attacking = false;
            hitbox1.body.enable = false;
        });
        
        // Player Health
        HP = game.add.group();
        livesText = game.add.text(10, 10, 'Lives: ', {font: '24px Comic Sans MS', fill: '#fff'});
        livesText.fixedToCamera = true;
        
        for(var i=0; i<player.health; i++){
            var healthOrb = HP.create(230-(35*i), 30, 'healthOrb');
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
        
        // Bat
        bats = game.add.group();
        bats.enableBody = true;
        bats.physicsBodyType = Phaser.ARCADE;
        for(var i=0; i<10; i++){
            this.createBats();
        }
        
        bats.setAll('anchor.x', 0.5);
        bats.setAll('anchor.y', 0.5);
        bats.setAll('scale.x', 0.1);
        bats.setAll('scale.y', 0.1);    
        bats.callAll('animations.add', 'animations', 'batWalk', [0, 1, 2], 15, true);
        bats.callAll('play', null, 'batWalk');
                
        // Keyboard
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        menuButton = game.input.keyboard.addKey(Phaser.Keyboard.M);
        
        // Skull
        skull = game.add.sprite(2250, 350, 'skull');
        skull.anchor.setTo(0.3, 0.3);
        skull.scale.setTo(0.5, 0.5);
        
        // Game Over Sprite
        gameOver = game.add.sprite(400, 300, 'gameOverButton');
        gameOver.anchor.setTo(0.5, 0.5);
        gameOver.visible = false;
        gameOver.fixedToCamera = true;
        
        // Music
        mainBG = game.add.audio('mainMusic', 1, true);
        mainBG.play();
        swordSlash = game.add.audio('swordSlash');
    },
    
    update: function(){        
        // Timer Update
        if(!isGameOver){
            this.playerAttackTimer();
        }
        
        // Hitboxes
        game.physics.arcade.overlap(hitbox1, bats);
        game.physics.arcade.collide(hitbox1, ground, this.hitboxCollision, null, this);
        if (attacking) {
            hitbox1.body.setSize(64, 96, 16*facing, -40);
        }
        
        // Player Attack and Movement
        game.physics.arcade.collide(player, ground);
        
        if (attackButton.isDown && canAttack && player.body.onFloor()) {
            player.body.velocity.x = 0;
            if (attackButton.justPressed()) {
                this.playerAttack();
                canAttack = false;
            }
        }
        
        if (jumpButton.isDown && player.body.onFloor()) {
            player.body.velocity.y = -500;
        }
        
        if (!attackButton.isDown) {
            if (player.body.onFloor()) {
                if (cursors.left.isDown) {
                    player.body.velocity.x = -175;
                    player.scale.setTo(-0.12, 0.12);
                    facing = -1;
                    player.play('run');
                } else if (cursors.right.isDown) {
                    player.body.velocity.x = 175;
                    player.scale.setTo(0.12, 0.12);
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
        game.physics.arcade.collide(bats, ground);
        game.physics.arcade.overlap(player, bats, this.playerDamaged, null, this);
        
        // Hurt
        if(player.hurt){
            var hurtTimer = game.time.create(true);
            hurtTimer.add(3000, function(){
                player.hurt = false;
            });
            hurtTimer.start();
        }
        
        // Fall into hole
        if(player.y > 550){
            player.kill();
            isGameOver = true;
            gameOver.visible = true;
            gameOver.inputEnabled = true;
            gameOver.events.onInputDown.add(this.gameOver, this);
        }
        
        // Pause Menu
        if (menuButton.isDown) {
            game.paused = true;
            menu = game.add.sprite(400, 300, 'menuButton');
            menu.anchor.setTo(0.5, 0.5);
            menu.fixedToCamera = true;
        } 
        game.input.onDown.add(this.unpause, self);
        
        // Next Level
        if(player.x >= 2350){
            mainBG.stop();
            game.state.start('boss');
        }
    },
    
    hitboxCollision: function(){
        hitbox1.body.enable = false;
    },
    
    playerAttackTimer: function(){
        if(!canAttack){
            attackTimer += 1;
        }
        if(attackTimer === 30){
            canAttack = true;
            attackTimer = 0;
        }
    },
    
    playerAttack: function(){
        if (!attacking) {
            attacking = true;
            swordSlash.play();
            var atkTimer = game.time.create(true);
            atkTimer.add(150, function(){
                attacking = false;
                hitbox1.body.enable = true;
            });
            atkTimer.start();
            playerAttack.play();
        }
    },
    
    attackHit: function(self, enemy){
        enemy.kill();
    },
    
    createBats: function(){
        bat = bats.create(700 + Math.random() * 1000, 50, 'batSprite');
        game.physics.arcade.enable(bat);
        bat.body.collideWorldBounds = true;
        game.time.events.loop(Phaser.Timer.SECOND, function(){
            mover = game.rnd.integerInRange(1, 3);
            if(mover == 1){
                bat.body.velocity.x = 30;
            }
            else if(mover == 2){
                bat.body.velocity.x = -30;
            }
            else{
                bat.body.velocity.x = 0;
            }
        }, this);
    },
    
    playerDamaged: function(self, other){
        // When player is damaged
        if(!player.hurt){
            alive = HP.getFirstAlive();
            if(alive){
                alive.kill();
            }
            player.hurt = true;
            player.body.velocity.x = 200 * Math.sign(player.body.x - other.body.x);
            player.body.velocity.y = -500*.6;
        }
        
        // If player is dead
        if(HP.countLiving()<1){
            player.kill();
            isGameOver = true;
            gameOver.visible = true;
            gameOver.inputEnabled = true;
            gameOver.events.onInputDown.add(this.gameOver, this);
        }
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

function setTileCollision(mapLayer, idxOrArray, dirs) {
 
    var mFunc; // tile index matching function
    if (idxOrArray.length) {
        // if idxOrArray is an array, use a function with a loop
        mFunc = function(inp) {
            for (var i = 0; i < idxOrArray.length; i++) {
                if (idxOrArray[i] === inp) {
                    return true;
                }
            }
            return false;
        };
    } else {
        // if idxOrArray is a single number, use a simple function
        mFunc = function(inp) {
            return inp === idxOrArray;
        };
    }
 
    // get the 2-dimensional tiles array for this layer
    var d = mapLayer.map.layers[mapLayer.index].data;
     
    for (var i = 0; i < d.length; i++) {
        for (var j = 0; j < d[i].length; j++) {
            var t = d[i][j];
            if (mFunc(t.index)) {
                 
                t.collideUp = dirs.top;
                t.collideDown = dirs.bottom;
                t.collideLeft = dirs.left;
                t.collideRight = dirs.right;
                 
                t.faceTop = dirs.top;
                t.faceBottom = dirs.bottom;
                t.faceLeft = dirs.left;
                t.faceRight = dirs.right;
                 
            }
        }
    }
 
}