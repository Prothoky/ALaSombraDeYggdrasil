class TutorialMenu extends Phaser.Scene{
  constructor(){
      super("TutorialMenu");
  }

  create(){

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.backgroundTM = this.add.image(gameWidth/2, gameHeight/2, 'BackgroundTutorial');
    if(userConfig.lang == "en"){
      this.backgroundTM = this.add.image(gameWidth/2, gameHeight/2, 'BackgroundTutorialEn');
    }
    this.backgroundTM.setScale(2/3);

    //FULL SCREEN
    this.fullScreenLM = this.add.image(gameWidth*15.5/16, gameHeight*13/14, 'buttonFullScreen');
    this.fullScreenLM.setScale(1.5/3);
    this.fullScreenLM.setInteractive({ useHandCursor: true})
    .on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

    //Back
    this.backButtonTM = this.add.image(gameWidth*14.5/16, gameHeight*14.8/16, 'deselectedButtonSmall');
    this.backButtonTM.setScale(1.5/3);
    this.backButtonTMSel = this.add.image(gameWidth*14.3/16, gameHeight*14.8/16, 'selSmallLeftButton');
    this.backButtonTMSel.setScale(1.5/3);
    this.backButtonTMSel.setVisible(false);
    //Texto Boton
    this.backText = this.add.text(gameWidth*14.18/16, gameHeight*14.61/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "16px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.backText.setX(gameWidth*14.3 /16);
    }
    //Acciones Boton
    this.backButtonTM.on('pointerover', function (pointer) {this.backButtonTMSel.setVisible(true);}, this);
    this.backButtonTM.on('pointerout', function (pointer) {this.backButtonTMSel.setVisible(false);}, this);
    this.backButtonTM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());

  }


  BackMainMenu(){
    this.clickSound.play();
    this.scene.pause('TutorialMenu');
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
