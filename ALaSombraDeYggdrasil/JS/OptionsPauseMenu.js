class OptionsPauseMenu extends Phaser.Scene{
  constructor(){
      super("OptionsPauseMenu");
  }

  preload(){



  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.backgroundOPM = this.add.image(0, 0, 'backgroundVM');
    this.backgroundOPM.setScale(1.5/3);
    this.backgroundOPM.setPosition(gameWidth/2, gameHeight/2);


    //BOTON SUBIR VOLUMEN
    //MUSICA
    this.musicUpButton = this.add.image(gameWidth*10.45/16, gameHeight*7/16, 'VolumeUpButtonOM');
    this.musicUpButton.setScale(1.5/3);
    this.musicUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirMusica());
    //EFECTOS
    this.effectsUpButton = this.add.image(gameWidth*10.45/16, gameHeight*9.36/16, 'VolumeUpButtonOM');
    this.effectsUpButton.setScale(1.5/3);
    this.effectsUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirEfectos());

    //BOTON BAJAR VOLUMEN
    //MUSICA
    this.musicDownButton = this.add.image(gameWidth*5.5/16, gameHeight*7/16, 'VolumeDownButtonOM');
    this.musicDownButton.setScale(1.5/3);
    this.musicDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarMusica());
    //EFECTOS
    this.effectsDownButton = this.add.image(gameWidth*5.5/16, gameHeight*9.36/16, 'VolumeDownButtonOM');
    this.effectsDownButton.setScale(1.5/3);
    this.effectsDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarEfectos());

    this.VolumenMusica = this.add.text(gameWidth*7.9/16, gameHeight*6.69/16,  userConfig.volumeMusic, {fontFamily: "Acadian_Runes",fontSize: "25px", align: 'center', fill: "#481d18"});
    this.VolumenEfectos = this.add.text(gameWidth*7.9/16, gameHeight*9.11/16,  userConfig.volumeEffects, {fontFamily: "Acadian_Runes",fontSize: "25px", align: 'center', fill: "#481d18"});

    //BOTON ATRAS
    this.backButtonOPM = this.add.image(gameWidth*8/16, gameHeight*12/16, 'deselectedButton');
    this.backButtonOPM.setScale(1.5/3);
    this.backButtonOPMSel = this.add.image(gameWidth*7.72/16, gameHeight*12/16, 'selLeftButton');
    this.backButtonOPMSel.setScale(1.5/3);
    this.backButtonOPMSel.setVisible(false);
    //TEXT
    this.backText = this.add.text(gameWidth*7.4/16, gameHeight*11.7/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "30px", align: 'center', fill: "#481d18"});
    //ACTIONS
    this.backButtonOPM.on('pointerover', function (pointer) {this.backButtonOPMSel.setVisible(true);}, this);
    this.backButtonOPM.on('pointerout', function (pointer) {this.backButtonOPMSel.setVisible(false);}, this);
    this.backButtonOPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackPauseMenu());
  }

  SubirMusica() {
    if (userConfig.volumeMusic < 10) {
      userConfig.volumeMusic += 1;
      musicMenu.setVolume(userConfig.volumeMusic/10);
      musicGameplay.setVolume(userConfig.volumeMusic/10);
    }
    this.VolumenMusica.setText(userConfig.volumeMusic);
  }

  BajarMusica() {
    if (userConfig.volumeMusic > 0) {
      userConfig.volumeMusic -= 1;
      musicMenu.setVolume(userConfig.volumeMusic/10);
      musicGameplay.setVolume(userConfig.volumeMusic/10);
    }
    this.VolumenMusica.setText(userConfig.volumeMusic);
  }

  SubirEfectos() {
    if ( userConfig.volumeEffects < 10) {
       userConfig.volumeEffects += 1;
    }
    this.VolumenEfectos.setText( userConfig.volumeEffects);
  }

  BajarEfectos() {
    if ( userConfig.volumeEffects > 0) {
       userConfig.volumeEffects -= 1;
    }
    this.VolumenEfectos.setText( userConfig.volumeEffects);
  }

  BackPauseMenu(){
    this.scene.stop('OptionsPauseMenu');
    this.scene.sendToBack('OptionsPauseMenu');
    this.scene.start('PauseMenu'); //Ver como hacer para que lleve a la anterior real
  }
}
