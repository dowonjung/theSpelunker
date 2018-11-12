var mainMenu = {
    preload: function(){
        var loadingBar = game.add.sprite(game.world.centerX-(387/2), 400, 'loading');
        var status = game.add.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        status.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
    },
    
    create: function(){
        game.state.start('tutorial');
    }
}