class OptionsMainMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMainMenu");
  }

  preload(){



  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundOM');
    background.setScale(2/3);
    background.setPosition(wid/2, heig/2);


    //BOTON SUBIR VOLUMEN
    //MUSICA
    this.musicUpButton = this.add.image(wid*4.8/16, heig*6.8/16, 'VolumeUpButtonOM');
    this.musicUpButton.setScale(2/3);
    this.musicUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirMusica());
    //EFECTOS
    this.effectsUpButton = this.add.image(wid*4.8/16, heig*9.7/16, 'VolumeUpButtonOM');
    this.effectsUpButton.setScale(2/3);
    this.effectsUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirEfectos());

    //BOTON BAJAR VOLUMEN
    //MUSICA
    this.musicDownButton = this.add.image(wid*12.9/16, heig*6.85/16, 'VolumeDownButtonOM');
    this.musicDownButton.setScale(2/3);
    this.musicDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarMusica());
    //EFECTOS
    this.effectsDownButton = this.add.image(wid*12.9/16, heig*9.7/16, 'VolumeDownButtonOM');
    this.effectsDownButton.setScale(2/3);
    this.effectsDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarEfectos());

    this.VolumenMusica = this.add.text(wid*8.9/16, heig*6.85/16, volumeMusic, {fill: "black"});
    this.VolumenEfectos = this.add.text(wid*8.9/16, heig*9.7/16, volumeEffects, {fill: "black"});

    //BOTON ATRAS
    this.backButtonOM = this.add.image(wid*14/16, heig*14/16, 'backButtonOM');
    this.backButtonOM.setScale(1.5/3);
    this.backButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());
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

  BackMainMenu(){
    this.scene.stop('OptionsMainMenu');
    this.scene.sendToBack('OptionsMainMenu');
    this.scene.start('MainMenu'); //Ver como hacer para que lleve a la anterior real
  }
}
