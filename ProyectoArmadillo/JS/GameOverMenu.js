class GameOverMenu extends Phaser.Scene{
  constructor(){
      super("GameOverMenu");
  }

  create(){

    this.cameras.main.fadeIn(500, 0, 0, 0);

    var backgroundGOM = this.add.image(0, 0, 'backgroundGOM');
    backgroundGOM.setScale(2/3);
    backgroundGOM.setPosition(gameWidth/2, gameHeight/2);

    //BOTON VOLVER A JUGAR
    this.retryButtonGOM = this.add.image(gameWidth*5/16, gameHeight*11/16, 'ButtonRetryGOM');
    this.retryButtonGOM.setScale(2/3);
    this.retryButtonGOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.PlayAgain());

    //BOTON ABANDONAR
    this.quitButtonGOM = this.add.image(gameWidth*10/16, gameHeight*11/16, 'ButtonQuitGOM');
    this.quitButtonGOM.setScale(2/3);
    this.quitButtonGOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.QuitGameGOM());

    this.FinalText = this.add.text(gameWidth*8/16, gameHeight*8.6/16, 'Perdiste Wey', {fill: "black"});

  }

  PlayAgain(){
    this.scene.stop('GameOverMenu');
    this.scene.start('LevelManager');
    this.scene.bringToTop('LevelManager');
    //LevelManager.restartLevel();
  }

  QuitGameGOM(){
    this.scene.pause('GameOverMenu');
    this.scene.sendToBack('GameOverMenu');
    this.scene.start('World1Map');
  }

}
