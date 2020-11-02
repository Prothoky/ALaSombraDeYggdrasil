class OptionsPauseMenu extends Phaser.Scene{
  constructor(){
      super("OptionsPauseMenu");
  }

  preload(){



  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundVM');
    background.setScale(1/3);
    background.setPosition(wid/2, heig/2);


    //BOTON SUBIR VOLUMEN
    //MUSICA
    this.musicUpButton = this.add.image(wid*6.4/16, heig*7.45/16, 'VolumeUpButtonOM');
    this.musicUpButton.setScale(1/3);
    this.musicUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirMusica());
    //EFECTOS
    this.effectsUpButton = this.add.image(wid*6.4/16, heig*8.8/16, 'VolumeUpButtonOM');
    this.effectsUpButton.setScale(1/3);
    this.effectsUpButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SubirEfectos());

    //BOTON BAJAR VOLUMEN
    //MUSICA
    this.musicDownButton = this.add.image(wid*10.5/16, heig*7.45/16, 'VolumeDownButtonOM');
    this.musicDownButton.setScale(1/3);
    this.musicDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarMusica());
    //EFECTOS
    this.effectsDownButton = this.add.image(wid*10.5/16, heig*8.8/16, 'VolumeDownButtonOM');
    this.effectsDownButton.setScale(1/3);
    this.effectsDownButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BajarEfectos());

    this.VolumenMusica = this.add.text(wid*8/16, heig*7.45/16, volumeMusic, {fill: "black"});
    this.VolumenEfectos = this.add.text(wid*8/16, heig*8.8/16, volumeEffects, {fill: "black"});

    //BOTON ATRAS
    this.backButtonOM = this.add.image(wid*11/16, heig*11/16, 'backButtonOM');
    this.backButtonOM.setScale(1/3);
    this.backButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackPauseMenu());
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

  BackPauseMenu(){
    this.scene.stop('OptionsPauseMenu');
    this.scene.sendToBack('OptionsPauseMenu');
    this.scene.start('PauseMenu'); //Ver como hacer para que lleve a la anterior real
  }
}
