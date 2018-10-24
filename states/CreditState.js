var creditState = {
    
    create: function() {
        this.dev = game.load.image('devCredit');
        game.world.backgroundColor = "black"
        this.showCredits();
    },
    
    update: function() {
        // Nothing here.
    },
    
    showCredits: function() {
        this.dev.anchor.setTo(); // Find an anchor point for where our credit image lies.
    }
};