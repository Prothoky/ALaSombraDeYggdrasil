class PauseMenu extends Phaser.Scene{
  constructor(){
      super("PauseMenu");
  }

  preload(){

  }

  create(){

    var backgroundPM = this.add.image(0, 0, 'backgroundPM');
    backgroundPM.setScale(1/3);
    backgroundPM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON OPCIONES
    this.optionsButtonPM = this.add.image(gameWidth*8/16, gameHeight*7/16, 'optionsButtonPM');
    this.optionsButtonPM.setScale(1.5/3);
    this.optionsButtonPM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.GoOptionsMenu());

    //BOTON ABANDONAR
    this.quitButtonPM = this.add.image(gameWidth*8/16, gameHeight*9/16, 'quitButtonPM');
    this.quitButtonPM.setScale(1.5/3);
    this.quitButtonPM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.QuitGame());

    //BOTON ATRAS
    this.backButtonPM = this.add.image(gameWidth*8/16, gameHeight*11/16, 'backButtonPM');
    this.backButtonPM.setScale(1.5/3);
    this.backButtonPM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackGame());

  }

  GoOptionsMenu(){
    this.scene.stop('PauseMenu');
    this.scene.start('OptionsPauseMenu');
    this.scene.bringToTop('OptionsPauseMenu');
  }

  BackGame(){
    //gamePaused = false;
    this.scene.stop('PauseMenu');
    this.scene.sendToBack('PauseMenu');
    this.scene.resume('LevelManager');
  }

  QuitGame(){
    this.scene.stop('LevelManager');
    if(arcadeMode==true){
      this.scene.start('MainMenu');
      this.scene.bringToTop('MainMenu');
    }
    else{
      this.scene.start('World1Map');
      this.scene.bringToTop('World1Map');
    }
  }
}
