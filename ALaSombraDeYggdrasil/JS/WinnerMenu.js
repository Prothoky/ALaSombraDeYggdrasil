class WinnerMenu extends Phaser.Scene{
  constructor(){
      super("WinnerMenu");
  }

  create(){

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.backgroundWM = this.add.image(gameWidth/2, gameHeight/2, 'WinnerBackgr');
    if(userConfig.lang == "en"){
      this.backgroundWM = this.add.image(gameWidth/2, gameHeight/2, 'WinnerBackgrEn');
    }
    this.backgroundWM.setScale(2/3);
    //this.backgroundWM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON CONTINUAR
    /*this.continueButtonWM = this.add.image(gameWidth*8/16, gameHeight*14/16, 'ButtonContinueWM');
    this.continueButtonWM.setScale(2/3);
    this.continueButtonWM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ContinueWM());*/

    //Volver a Jugar
    //Botones
    this.continueButtonWM = this.add.image(gameWidth*8/16, gameHeight*13.1/16, 'deselectedButton');
    this.continueButtonWM.setScale(2/3);
    this.continueButtonWMSel = this.add.image(gameWidth*7.65/16, gameHeight*13.1/16, 'selLeftButton');
    this.continueButtonWMSel.setScale(2/3);
    this.continueButtonWMSel.setVisible(false);
    //Texto
    this.continueText = this.add.text(gameWidth*6.8/16, gameHeight*12.57/16,  stringsJSON.Buttons.continue , {fontFamily: "Acadian_Runes", fill: "#481d18", fontSize: "40px"});
    if (userConfig.lang == "en"){
      this.continueText.setX(gameWidth*6.95/16);
    }
    //Acciones Boton
    this.continueButtonWM.on('pointerover', function (pointer) {this.continueButtonWMSel.setVisible(true);}, this);
    this.continueButtonWM.on('pointerout', function (pointer) {this.continueButtonWMSel.setVisible(false);}, this);
    this.continueButtonWM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ContinueWM());

    //this.FinalText = this.add.text(gameWidth*8/16, gameHeight*8.6/16, 'Ganaste Wey', {fill: "black"});


  }

  ContinueWM(){
    this.clickSound.play();
    this.scene.pause('WinnerMenu');
    this.scene.sendToBack('WinnerMenu');
    this.scene.start('MapSelectionMenu');
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
