var boss = {
    
    preload: function(){

    },
    
    create: function(){
        // Super Slime
        slime = game.add.group();
        slime.enableBody = true;
        slime.physicsBodyType = Phaser.Physics.ARCADE;
        slime.body.collideWorldBounds = true;
        slime.health = 50;
        
        spawnSuperSlime();
    },
    
    update: function(){
        // Slime movement
        if (player.x <= superSlime.x){
            superSlime.scale.setTo(0.7, 0.7);
            superSlime.x -= speed;
            superSlime.play('slime_walk', 10, true);
        } else {
            superSlime.scale.setTo(-0.7, 0.7);
            superSLime.x += speed;
            superSlime.play('slime_walk', 10, true);
        }
        
        // Check collisions
        game.physics.arcade.overlap(player, superSlime, bossCollide, null, this);
        
        // Attack
        superSlime.time.events.loop(Phaser.Time.SECOND*8, superSlime.superSlimeAttack, this);
    },
    
    spawnSuperSlime: function(){
        var superSlime = slime.create('slime');
        superSlime.anchor.setTo(0.5, 0.5);
        superSlime.animations.add('slime_walk', [0,1,2,3]);
        superSlime.body.moves = true;        
        superSlime.x = 400;
        superSlime.y = 600;
        var tween = game.add.tween(superSlime).to({x:400}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        tween.onLoop.add(descend, this);
    },
    
    bossCollide: function(){
        player.health -= 1;
        // Progress needed
    },
    
    superSlimeAttack: function(){
        var attackingSlime = slime.create('slimeAttack');
        attackingSlime.anchor.setTo(0.5, 0.5);
        attackingSlime.animations.add('slime_attack', [0,1,2]);
        attackingSlime.body.moves = true;
        attackingSlime.x = this.superSlime.x;
        attackingSlime.y = this.superSlime.y;
        
        if (player.x <= superSlime.x){
            superSlime.scale.setTo(0.7, 0.7);
            superSlime.play('slime_attack', 10, true);
        } else {
            superSlime.scale.setTo(-0.7, 0.7);
            superSlime.play('slime_attack', 10, true);
        }
        
        game.physics.arcade.overlap(player, attackingSlime, bossCollide, null, this);
    },
    
    hitBoss: function(){
        // when player inflicts damage on boss
    },
    
    killBoss: function(){
        // when boss has 0 health and dies
    }
};