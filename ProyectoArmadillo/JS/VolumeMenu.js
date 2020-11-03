class VolumeMenu extends Phaser.Scene{
  constructor(){
      super("VolumeMenu");
  }

  create(){

    var backgroundVM = this.add.image(0, 0, 'backgroundVM');
    backgroundVM.setScale(2/3);
    backgroundVM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON SUBIR VOLUMEN
    //MUSICA
    this.musicUpButton = this.add.image(gameWidth*4.8/16, gameHeight*6.8/16, 'VolumeUpButtonOM');
    this.musicUpButton.setScale(2/3);
    this.musicUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirMusica());
    //EFECTOS
    this.effectsUpButton = this.add.image(gameWidth*4.8/16, gameHeight*9.7/16, 'VolumeUpButtonOM');
    this.effectsUpButton.setScale(2/3);
    this.effectsUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirEfectos());

    //BOTON BAJAR VOLUMEN
    //MUSICA
    this.musicDownButton = this.add.image(gameWidth*12.9/16, gameHeight*6.85/16, 'VolumeDownButtonOM');
    this.musicDownButton.setScale(2/3);
    this.musicDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarMusica());
    //EFECTOS
    this.effectsDownButton = this.add.image(gameWidth*12.9/16, gameHeight*9.7/16, 'VolumeDownButtonOM');
    this.effectsDownButton.setScale(2/3);
    this.effectsDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarEfectos());

    this.VolumenMusica = this.add.text(gameWidth*8.9/16, gameHeight*6.85/16, volumeMusic, {fill: "black"});
    this.VolumenEfectos = this.add.text(gameWidth*8.9/16, gameHeight*9.7/16, volumeEffects, {fill: "black"});

    //BOTON ATRAS
    this.backButtonVM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonOM');
    this.backButtonVM.setScale(1.5/3);
    this.backButtonVM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackOptionsMenuVM());


  }

  SubirMusica() {
    if (volumeMusic < 10) {
      volumeMusic += 1;
      musicMenu.setVolume(volumeMusic/10);
    }
    this.VolumenMusica.setText(volumeMusic);
  }

  BajarMusica() {
    if (volumeMusic > 0) {
      volumeMusic -= 1;
      musicMenu.setVolume(volumeMusic/10);
    }
    this.VolumenMusica.setText(volumeMusic);
  }

  SubirEfectos() {
    if (volumeEffects < 10) {
      volumeEffects += 1;
    }

    this.VolumenEfectos.setText(volumeEffects);
  }

  BajarEfectos() {
    if (volumeEffects > 0) {
      volumeEffects -= 1;
    }
    this.VolumenEfectos.setText(volumeEffects);
  }

  BackOptionsMenuVM(){
    this.scene.pause('VolumeMenu');
    this.scene.start('OptionsMainMenu');
  }

}