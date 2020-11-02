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

    //BOTON VOLUMEN
    this.VolumeButtonOM = this.add.image(wid*8/16, heig*6/16, 'VolumeButton');
    this.VolumeButtonOM.setScale(2/3);
    this.VolumeButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.VolumeMenu());

    //BOTON AJUSTES
    this.SettingsButtonOM = this.add.image(wid*8/16, heig*8/16, 'SettingsButton');
    this.SettingsButtonOM.setScale(2/3);
    this.SettingsButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.SettingsMenu());

    //BOTON BORRAR DATOS
    this.DeleteButtonOM = this.add.image(wid*8/16, heig*10/16, 'DeleteButton');
    this.DeleteButtonOM.setScale(2/3);
    this.DeleteButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.DeleteData());

    //BOTON ATRAS
    this.backButtonOM = this.add.image(wid*8/16, heig*12/16, 'backButtonOM');
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

  DeleteData(){
    console.log("Borrar datos");
  }

  BackMainMenu(){
    this.scene.pause('OptionsMainMenu');
    this.scene.start('MainMenu'); //Ver como hacer para que lleve a la anterior real
  }
}
