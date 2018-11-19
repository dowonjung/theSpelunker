var mainMenu = {    
    create: function(){
        // Background
        var titleBackground = game.add.sprite(0, 0, 'titleBG');
        titleBackground.width = game.width;
        titleBackground.height = game.height;
        
        // Game Title
        var title = game.add.sprite(game.world.centerX, game.world.centerY-100, 'title');
        title.anchor.setTo(0.5, 0.5);
        title.scale.setTo(0.7, 0.7);
        
        // Play
        var playButton = game.add.sprite(150, 400, 'playButton');
        playButton.scale.setTo(0.6, 0.6);
        playButton.inputEnabled = true;
        playButton.events.onInputDown.add(this.goPlay, this);
        
        // Tutorial
        var tutorialButton = game.add.sprite(400, 400, 'tutorialButton');
        tutorialButton.scale.setTo(0.6, 0.6);
        tutorialButton.inputEnabled = true;
        tutorialButton.events.onInputDown.add(this.goTutorial, this);
    },
    
    goPlay: function(){
        game.state.start('play1');
    },
    
    goTutorial: function(){
        game.state.start('tutorial');
    },
}