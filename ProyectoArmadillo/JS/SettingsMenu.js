class SettingsMenu extends Phaser.Scene{
  constructor(){
      super("SettingsMenu");

      this.easyButtonSelSM;
      this.mediumButtonSelSM;
      this.diffButtonSelSM;
  }

  create(){

    this.cameras.main.fadeIn(1500, 0, 0, 0);

    this.backgroundSM = this.add.image(0, 0, 'backgroundSetM');
    this.backgroundSM.setScale(2/3);
    this.backgroundSM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON FACIL
    this.easyButtonSM = this.add.image(gameWidth*4/16, gameHeight*7/16, 'EasyButton');
    this.easyButtonSM.setScale(2/3);
    this.easyButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.EasyLevel());
      //Seleccionado
    this.easyButtonSelSM = this.add.image(gameWidth*4/16, gameHeight*7/16, 'EasyButtonSelected');
    this.easyButtonSelSM.setScale(2/3);
    this.easyButtonSelSM.setVisible(false);


    //BOTON MEDIO
    this.mediumButtonSM = this.add.image(gameWidth*8/16, gameHeight*7/16, 'MediumButton');
    this.mediumButtonSM.setScale(2/3);
    this.mediumButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.MediumLevel());
      //Seleccionado
    this.mediumButtonSelSM = this.add.image(gameWidth*8/16, gameHeight*7/16, 'MediumButtonSelected');
    this.mediumButtonSelSM.setScale(2/3);
    this.mediumButtonSelSM.setVisible(false);


    //BOTON DIFICIL
    this.diffButtonSM = this.add.image(gameWidth*12/16, gameHeight*7/16, 'DifficultButton');
    this.diffButtonSM.setScale(2/3);
    this.diffButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.DifficultLevel());
      //Seleccionado
    this.diffButtonSelSM = this.add.image(gameWidth*12/16, gameHeight*7/16, 'DifficultButtonSelected');
    this.diffButtonSelSM.setScale(2/3);
    this.diffButtonSelSM.setVisible(false);

    //BOTON BORRAR DATOS
    this.deleteButtonSM = this.add.image(gameWidth*8/16, gameHeight*10/16, 'DeleteButton');
    this.deleteButtonSM.setScale(2/3);
    this.deleteButtonSM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.ConfirmErase());

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
    this.easyButtonSelSM.setVisible(true);
    this.mediumButtonSelSM.setVisible(false);
    this.diffButtonSelSM.setVisible(false);
    userConfig.difficulty = 0;
  }

  MediumLevel(){
    console.log ("Nivel medio");
    this.easyButtonSelSM.setVisible(false);
    this.mediumButtonSelSM.setVisible(true);
    this.diffButtonSelSM.setVisible(false);
    userConfig.difficulty = 1;
  }

  DifficultLevel(){
    console.log ("Nivel dificil");
    this.easyButtonSelSM.setVisible(false);
    this.mediumButtonSelSM.setVisible(false);
    this.diffButtonSelSM.setVisible(true);
    userConfig.difficulty = 2;
  }

  ConfirmErase(){
    //Otra escena donde aparezcan dos botones?
    if(true){
      resetUserData()
    }
    else{

    }
  }

}
