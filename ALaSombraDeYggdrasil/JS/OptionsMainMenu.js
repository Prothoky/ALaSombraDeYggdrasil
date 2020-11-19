class OptionsMainMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMainMenu");
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());

    this.backgroundOMM = this.add.image(0, 0, 'backgroundOM');
    if (userConfig.lang == "en"){
      this.backgroundOMM.setTexture('backgroundOMEn');
    }
    this.backgroundOMM.setScale(2/3);
    this.backgroundOMM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON VOLUMEN
    this.VolumeButtonOM = this.add.image(gameWidth*8/16, gameHeight*6.7/16, 'deselectedButton');
    this.VolumeButtonOM.setScale(2/3);
    this.VolumeButtonOMSel = this.add.image(gameWidth*7.65/16, gameHeight*6.7/16, 'selLeftButton');
    this.VolumeButtonOMSel.setScale(2/3);
    this.VolumeButtonOMSel.setVisible(false);
    //TEXT
    this.volumeText = this.add.text(gameWidth*7/16, gameHeight*6.3/16,  stringsJSON.Buttons.volume, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.volumeText.setX(gameWidth*7.1/16)
    }
    //ACTIONS
    this.VolumeButtonOM.on('pointerover', function (pointer) {this.VolumeButtonOMSel.setVisible(true);}, this);
    this.VolumeButtonOM.on('pointerout', function (pointer) {this.VolumeButtonOMSel.setVisible(false);}, this);
    this.VolumeButtonOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.VolumeMenu());

    //BOTON AJUSTES
    this.SettingsButtonOM = this.add.image(gameWidth*8/16, gameHeight*9.8/16, 'deselectedButton');
    this.SettingsButtonOM.setScale(2/3);
    this.SettingsButtonOMSel = this.add.image(gameWidth*8.35/16, gameHeight*9.8/16, 'selRightButton');
    this.SettingsButtonOMSel.setScale(2/3);
    this.SettingsButtonOMSel.setVisible(false);
    //TEXT
    this.seetingsText = this.add.text(gameWidth*7.1/16, gameHeight*9.3/16,  stringsJSON.Buttons.adjust, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.seetingsText.setX(gameWidth*6.9/16)
    }
    //ACTIONS
    this.SettingsButtonOM.on('pointerover', function (pointer) {this.SettingsButtonOMSel.setVisible(true);}, this);
    this.SettingsButtonOM.on('pointerout', function (pointer) {this.SettingsButtonOMSel.setVisible(false);}, this);
    this.SettingsButtonOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SettingsMenu());


    //BOTON ATRAS
    this.backButtonOM = this.add.image(gameWidth*8/16, gameHeight*13/16, 'deselectedButton');
    this.backButtonOM.setScale(2/3);
    this.backButtonOMSel = this.add.image(gameWidth*7.65/16, gameHeight*13/16, 'selLeftButton');
    this.backButtonOMSel.setScale(2/3);
    this.backButtonOMSel.setVisible(false);
    //TEXT
    this.backText = this.add.text(gameWidth*7.1/16, gameHeight*12.5/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    if (userConfig.lang == "en"){
      this.backText.setX(gameWidth*7.4/16)
    }
    //ACTIONS
    this.backButtonOM.on('pointerover', function (pointer) {this.backButtonOMSel.setVisible(true);}, this);
    this.backButtonOM.on('pointerout', function (pointer) {this.backButtonOMSel.setVisible(false);}, this);
    this.backButtonOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());
  }

  VolumeMenu(){
    this.clickSound.play();
    this.scene.pause('OptionsMainMenu');
    this.scene.start('VolumeMenu'); //Ver como hacer para que lleve a la anterior real
  }

  SettingsMenu(){
    this.clickSound.play();
    this.scene.pause('OptionsMainMenu');
    this.scene.start('SettingsMenu'); //Ver como hacer para que lleve a la anterior real
  }


  BackMainMenu(){
    this.clickSound.play();
    this.scene.pause('OptionsMainMenu');
    this.scene.start(prevScene); //Ver como hacer para que lleve a la anterior real
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
