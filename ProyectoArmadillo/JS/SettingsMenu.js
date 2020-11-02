class SettingsMenu extends Phaser.Scene{
  constructor(){
      super("SettingsMenu");
  }

  create(){

    var backgroundSM = this.add.image(0, 0, 'backgroundSetM');
    backgroundSM.setScale(2/3);
    backgroundSM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON FACIL
    this.EasyButtonSM = this.add.image(gameWidth*6/16, gameHeight*7/16, 'EasyButton');
    this.EasyButtonSM.setScale(2/3);
    this.EasyButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.EasyLevel());

    //BOTON MEDIO
    this.MediumButtonSM = this.add.image(gameWidth*8/16, gameHeight*7/16, 'MediumButton');
    this.MediumButtonSM.setScale(2/3);
    this.MediumButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.MediumLevel());

    //BOTON DIFICIL
    this.DiffButtonSM = this.add.image(gameWidth*10/16, gameHeight*7/16, 'DifficultButton');
    this.DiffButtonSM.setScale(2/3);
    this.DiffButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.DifficultLevel());

    //BOTON BORRAR DATOS
    this.DeleteButtonSM = this.add.image(gameWidth*8/16, gameHeight*10/16, 'DeleteButton');
    this.DeleteButtonSM.setScale(2/3);
    this.DeleteButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.DeleteData());

    //BOTON ATRAS
    this.backButtonVM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonOM');
    this.backButtonVM.setScale(1.5/3);
    this.backButtonVM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackOptionsMenuSM());

  }

  BackOptionsMenuSM(){
    this.scene.pause('SettingsMenu');
    this.scene.start('OptionsMainMenu');
  }

  EasyLevel(){
    console.log ("Nivel fácil");
  }

  MediumLevel(){
    console.log ("Nivel medio");
  }

  DifficultLevel(){
    console.log ("Nivel dificil");
  }

  DeleteData(){
    console.log("Borrar datos");
  }


}
