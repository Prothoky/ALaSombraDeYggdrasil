class CreditsMenu extends Phaser.Scene{
  constructor(){
      super("CreditsMenu");
  }

  preload(){

  }

  create(){

    var backgroundCM = this.add.image(0, 0, 'backgroundCM');
    //backgroundCM.setScale(2/3)
    backgroundCM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON ATRAS
    this.backButtonCM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonCM');
    this.backButtonCM.setScale(1.5/3);
    this.backButtonCM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());
  }

  BackMainMenu(){
    this.scene.pause('CreditsMenu');
    this.scene.start('MainMenu');
  }
}
