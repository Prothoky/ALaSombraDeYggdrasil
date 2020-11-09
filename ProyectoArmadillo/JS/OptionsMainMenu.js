class OptionsMainMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMainMenu");
  }

  preload(){



  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    var background = this.add.image(0, 0, 'backgroundOM');
    background.setScale(2/3);
    background.setPosition(gameWidth/2, gameHeight/2);

    //BOTON VOLUMEN
    this.VolumeButtonOM = this.add.image(gameWidth*8/16, gameHeight*5/16, 'VolumeButton');
    this.VolumeButtonOM.setScale(2/3);
    this.VolumeButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.VolumeMenu());

    //BOTON AJUSTES
    this.SettingsButtonOM = this.add.image(gameWidth*8/16, gameHeight*8/16, 'SettingsButton');
    this.SettingsButtonOM.setScale(2/3);
    this.SettingsButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SettingsMenu());


    //BOTON ATRAS
    this.backButtonOM = this.add.image(gameWidth*8/16, gameHeight*11/16, 'backButtonOM');
    this.backButtonOM.setScale(2/3);
    this.backButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());
  }

  VolumeMenu(){
    this.scene.pause('OptionsMainMenu');
    this.scene.start('VolumeMenu'); //Ver como hacer para que lleve a la anterior real
  }

  SettingsMenu(){
    this.scene.pause('OptionsMainMenu');
    this.scene.start('SettingsMenu'); //Ver como hacer para que lleve a la anterior real
  }


  BackMainMenu(){
    this.scene.pause('OptionsMainMenu');
    this.scene.start('MainMenu'); //Ver como hacer para que lleve a la anterior real
  }
}
