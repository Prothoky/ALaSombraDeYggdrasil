class VolumeMenu extends Phaser.Scene{
  constructor(){
      super("VolumeMenu");
  }

  create(){
    this.cameras.main.fadeIn(1500, 0, 0, 0);
    
    this.backgroundVM = this.add.image(0, 0, 'backgroundVM');
    this.backgroundVM.setScale(2/3);
    this.backgroundVM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON SUBIR VOLUMEN
    //MUSICA
    this.musicUpButton = this.add.image( gameWidth*11.29/16, gameHeight*6.65/16, 'VolumeUpButtonOM');
    this.musicUpButton.setScale(2/3);
    this.musicUpButton.alpha = (0.00001);
    this.musicUpButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SubirMusica());
    //EFECTOS
    this.effectsUpButton = this.add.image( gameWidth*11.29/16, gameHeight*9.77/16, 'VolumeUpButtonOM');
    this.effectsUpButton.setScale(2/3);
    this.effectsUpButton.alpha = (0.00001);
    this.effectsUpButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SubirEfectos());

    //BOTON BAJAR VOLUMEN
    //MUSICA
    this.musicDownButton = this.add.image(gameWidth*4.66/16, gameHeight*6.65/16, 'VolumeDownButtonOM');
    this.musicDownButton.setScale(2/3);
    this.musicDownButton.alpha = (0.00001);
    this.musicDownButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BajarMusica());
    //EFECTOS
    this.effectsDownButton = this.add.image(gameWidth*4.66/16, gameHeight*9.77/16, 'VolumeDownButtonOM');
    this.effectsDownButton.setScale(2/3);
    this.effectsDownButton.alpha = (0.00001);
    this.effectsDownButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BajarEfectos());

    this.VolumenMusica = this.add.text(gameWidth*7.83/16, gameHeight*6.28/16,  userConfig.volumeMusic, {fontFamily: "Acadian_Runes",fontSize: "40px", fill: "#481d18"});
    this.VolumenEfectos = this.add.text(gameWidth*7.85/16, gameHeight*9.37/16,  userConfig.volumeEffects, {fontFamily: "Acadian_Runes",fontSize: "40px", fill: "#481d18"});

    //BOTON ATRAS
    this.backButtonVM = this.add.image(gameWidth*8/16, gameHeight*13/16, 'deselectedButton');
    this.backButtonVM.setScale(2/3);
    this.backButtonVMSel = this.add.image(gameWidth*7.65/16, gameHeight*13/16, 'selLeftButton');
    this.backButtonVMSel.setScale(2/3);
    this.backButtonVMSel.setVisible(false);
    //TEXT
    this.backText = this.add.text(gameWidth*7.1/16, gameHeight*12.5/16,  stringsJSON.Buttons.back, {fontFamily: "Acadian_Runes",fontSize: "40px", align: 'center', fill: "#481d18"});
    //ACTIONS
    this.backButtonVM.on('pointerover', function (pointer) {this.backButtonVMSel.setVisible(true);}, this);
    this.backButtonVM.on('pointerout', function (pointer) {this.backButtonVMSel.setVisible(false);}, this);
    this.backButtonVM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackOptionsMenuVM());



  }

  SubirMusica() {
    if ( userConfig.volumeMusic < 10) {
       userConfig.volumeMusic += 1;
      musicMenu.setVolume( userConfig.volumeMusic/10);
      musicGameplay.setVolume( userConfig.volumeMusic/10);
    }
    this.VolumenMusica.setText( userConfig.volumeMusic);
  }

  BajarMusica() {
    if ( userConfig.volumeMusic > 0) {
       userConfig.volumeMusic -= 1;
      musicMenu.setVolume( userConfig.volumeMusic/10);
      musicGameplay.setVolume( userConfig.volumeMusic/10);
    }
    this.VolumenMusica.setText( userConfig.volumeMusic);
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

  BackOptionsMenuVM(){
    this.scene.pause('VolumeMenu');
    this.scene.start('OptionsMainMenu');
  }

}
