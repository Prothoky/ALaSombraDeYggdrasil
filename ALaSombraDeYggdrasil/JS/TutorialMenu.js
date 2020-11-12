class TutorialMenu extends Phaser.Scene{
  constructor(){
      super("TutorialMenu");
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);


    //FULL SCREEN
    this.fullScreenLM = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreenLM.setScale(2/60);
    this.fullScreenLM.setInteractive({ useHandCursor: true})
    .on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

    //BACK BUTTON
    this.backButtonTM = this.add.image(gameWidth*14/16, gameHeight*13/14, 'backButton');
    this.backButtonTM.setScale(1.5/3);
    this.backButtonTM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());
    this.backButtonTM.depth = 3;


  }


  BackMainMenu(){
    this.scene.pause('TutorialMenu');
    this.scene.start('MainMenu');
  }

}
