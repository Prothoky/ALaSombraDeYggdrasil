class WinnerMenu extends Phaser.Scene{
  constructor(){
      super("WinnerMenu");
  }

  create(){

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.backgroundWM = this.add.image(0, 0, 'backgroundWM');
    this.backgroundWM.setScale(2/3);
    this.backgroundWM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON CONTINUAR
    this.continueButtonWM = this.add.image(gameWidth*8/16, gameHeight*14/16, 'ButtonContinueWM');
    this.continueButtonWM.setScale(2/3);
    this.continueButtonWM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ContinueWM());

    this.FinalText = this.add.text(gameWidth*8/16, gameHeight*8.6/16, 'Ganaste Wey', {fill: "black"});


  }

  ContinueWM(){
    this.clickSound.play();
    this.scene.pause('WinnerMenu');
    this.scene.sendToBack('WinnerMenu');
    this.scene.start('MainMenu');
  }

  EffectsConfig(){
    return {
      mute: false,
      volume: userConfig.volumeEffects/10,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
  }

}
