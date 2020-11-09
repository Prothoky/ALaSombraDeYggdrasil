class WinnerMenu extends Phaser.Scene{
  constructor(){
      super("WinnerMenu");
  }

  create(){

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    var backgroundWM = this.add.image(0, 0, 'backgroundWM');
    backgroundWM.setScale(2/3);
    backgroundWM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON CONTINUAR
    this.continueButtonWM = this.add.image(gameWidth*8/16, gameHeight*14/16, 'ButtonContinueWM');
    this.continueButtonWM.setScale(2/3);
    this.continueButtonWM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ContinueWM());

    this.FinalText = this.add.text(gameWidth*8/16, gameHeight*8.6/16, 'Ganaste Wey', {fill: "black"});


  }

  ContinueWM(){
    this.scene.pause('WinnerMenu');
    this.scene.sendToBack('WinnerMenu');
    this.scene.start('World1Map');
  }

}
