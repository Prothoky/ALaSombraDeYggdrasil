class OptionsPauseMenu extends Phaser.Scene{
  constructor(){
      super("OptionsPauseMenu");
  }

  create(){

    this.clickSound = this.sound.add('ClickButtonSound', this.EffectsConfig());
    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.backgroundOPM = this.add.image(0, 0, 'backgroundVM');
    this.backgroundOPM.setScale(2/3);
    this.backgroundOPM.setPosition(gameWidth/2, gameHeight/2);


    //BOTON SUBIR VOLUMEN
    //MUSICA
    this.musicUpButton = this.add.image(gameWidth*11.29/16, gameHeight*6.65/16, 'VolumeUpButtonOM');
    this.musicUpButton.setScale(2/3);
    this.musicUpButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SubirMusica());
    //EFECTOS
    this.effectsUpButton = this.add.image(gameWidth*11.29/16, gameHeight*9.77/16, 'VolumeUpButtonOM');
    this.effectsUpButton.setScale(2/3);
    this.effectsUpButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SubirEfectos());

    //BOTON BAJAR VOLUMEN
    //MUSICA
    this.musicDownButton = this.add.image(gameWidth*4.66/16, gameHeight*6.65/16, 'VolumeDownButtonOM');
    this.musicDownButton.setScale(2/3);
    this.musicDownButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BajarMusica());
    //EFECTOS
    this.effectsDownButton = this.add.image(gameWidth*4.66/16, gameHeight*9.77/16, 'VolumeDownButtonOM');
    this.effectsDownButton.setScale(2/3);
    this.effectsDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarEfectos());

    this.VolumenMusica = this.add.text(gameWidth*7.83/16, gameHeight*6.28/16,  userConfig.volumeMusic, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    this.VolumenEfectos = this.add.text(gameWidth*7.85/16, gameHeight*9.37/16,  userConfig.volumeEffects, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});

    //BOTON ATRAS
    this.backButtonOPM = this.add.image(gameWidth*8/16, gameHeight*13/16, 'deselectedButton');
    this.backButtonOPM.setScale(2/3);
    this.backButtonOPMSel = this.add.image(gameWidth*7.65/16, gameHeight*13/16, 'selLeftButton');
    this.backButtonOPMSel.setScale(2/3);
    this.backButtonOPMSel.setVisible(false);
    //TEXT
    this.backText = this.add.text(gameWidth*7.35/16, gameHeight*12.7/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "30px", align: 'center', fill: "#481d18"});
    //ACTIONS
    this.backButtonOPM.on('pointerover', function (pointer) {this.backButtonOPMSel.setVisible(true);}, this);
    this.backButtonOPM.on('pointerout', function (pointer) {this.backButtonOPMSel.setVisible(false);}, this);
    this.backButtonOPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackPauseMenu());
  }

  SubirMusica() {
    this.clickSound.play();
    if (userConfig.volumeMusic < 10) {
      userConfig.volumeMusic += 1;
      musicMenu.setVolume(userConfig.volumeMusic/10);
      musicGameplay.setVolume(userConfig.volumeMusic/10);
    }
    this.VolumenMusica.setText(userConfig.volumeMusic);
  }

  BajarMusica() {
    this.clickSound.play();
    if (userConfig.volumeMusic > 0) {
      userConfig.volumeMusic -= 1;
      musicMenu.setVolume(userConfig.volumeMusic/10);
      musicGameplay.setVolume(userConfig.volumeMusic/10);
    }
    this.VolumenMusica.setText(userConfig.volumeMusic);
  }

  SubirEfectos() {
    this.clickSound.play();
    if ( userConfig.volumeEffects < 10) {
       userConfig.volumeEffects += 1;
    }
    this.VolumenEfectos.setText( userConfig.volumeEffects);
  }

  BajarEfectos() {
    this.clickSound.play();
    if ( userConfig.volumeEffects > 0) {
       userConfig.volumeEffects -= 1;
    }
    this.VolumenEfectos.setText( userConfig.volumeEffects);
  }

  BackPauseMenu(){
    this.clickSound.play();
    this.scene.stop('OptionsPauseMenu');
    this.scene.sendToBack('OptionsPauseMenu');
    this.scene.start('PauseMenu'); //Ver como hacer para que lleve a la anterior real
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
